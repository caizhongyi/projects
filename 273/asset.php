<?php
define('V4_ENV', 'local');
/**
 * 静态资源加载器
 *
 *
 * @author 王煜 <wangyu@273.cn>
 * @Copyright (c) 2003-2015 273 Inc. (http://www.273.cn/)
 * @since 2015-08-25
 */
class Asset {

    /**
     * 静态资源服务器地址
     */
    private static $STA_URL = 'http://asset.273.com.cn';

    /**
     * 资源映射关系数组
     */
    public static $MAP = [];

    /**
     * 加载器
     */
    public static $FRAMEWORK = null;

    /**
     * 已经加载的资源
     */
    public static $LOADED = [];

    /**
     * 收集资源
     */
    public static $COLLECTION = [];

    /**
     * 收集require.async资源
     */
    public static $ASYNC_COLLECTION = [];

    /**
     * 已经删除的异步资源（即已经转为同步资源）
     */
    public static $ASYNC_DELETED = [];

    /**
     * 设置map.json
     *
     * @param string $map map.json
     * @return mixed
     */
    public function setMap($map = 'pc') {
        self::$MAP = json_decode(file_get_contents(self::$STA_URL . "/$map/map.json"), true);

        self::$FRAMEWORK = self::getUri('mod.js');

        return $this;
    }

    /**
     * 获取静态资源uri
     * 有包的时候，返回包的uri
     *
     * @param string $strName 资源路径
     * @return string 分发后的资源路径
     */
    public static function getUri($strName) {
        $arrMap = self::$MAP;
        if (isset($arrMap['res'][$strName])) {
            $arrRes = $arrMap['res'][$strName];
            // 非debug模式时取包的uri
            if(in_array(V4_ENV, array('sim', 'online')) && isset($arrRes['pkg'])) {
                $arrPkg = $arrMap['pkg'][$arrRes['pkg']];
                return $arrPkg['uri'];
            } else {
                return $arrRes['uri'];
            }
        }
    }

    /**
     * 基础加载器
     *
     * @return string $html
     */
    public static function getModJsHtml(){
        $html        = '';
        $resourceMap = self::getResourceMap();
        // 页面中包含js才需要加载器
        $loadModJs   = (self::$FRAMEWORK && (isset(self::$COLLECTION['js']) || $resourceMap));
        // require.resourceMap要在mod.js加载以后执行
        if ($loadModJs) {
            $html .= '<script type="text/javascript" src="' . self::$STA_URL . self::$FRAMEWORK . '"></script>' . PHP_EOL;
        }
        if ($resourceMap) {
            $html .= '<script type="text/javascript">';
            $html .= 'require.resourceMap(' . $resourceMap . ');';
            $html .= '</script>' . PHP_EOL;
        }

        return $html;
    }

    /**
     * 获取异步js资源集合，变为json格式的resource map
     */
    public static function getResourceMap() {
        $ret = '';
        $arrResourceMap = [];

        if (isset(self::$ASYNC_COLLECTION['res'])) {
            foreach (self::$ASYNC_COLLECTION['res'] as $id => $arrRes) {
                $deps = [];
                if (!empty($arrRes['deps'])) {
                    foreach ($arrRes['deps'] as $strName) {
                        if (preg_match('/\.js$/i', $strName)) {
                            $deps[] = $strName;
                        }
                    }
                }

                $arrResourceMap['res'][$id] = array(
                    'url' => $arrRes['uri'],
                );

                if (!empty($arrRes['pkg']) && in_array(V4_ENV, array('sim', 'online'))) {
                    $arrResourceMap['res'][$id]['pkg'] = $arrRes['pkg'];
                }

                if (!empty($deps)) {
                    $arrResourceMap['res'][$id]['deps'] = $deps;
                }
            }
        }

        if (isset(self::$ASYNC_COLLECTION['pkg']) && in_array(V4_ENV, array('sim', 'online'))) {
            foreach (self::$ASYNC_COLLECTION['pkg'] as $id => $arrRes) {
                $arrResourceMap['pkg'][$id] = array(
                    'url'=> $arrRes['uri']
                );
            }
        }

        if (!empty($arrResourceMap)) {
            $ret = str_replace('\\/', '/', json_encode($arrResourceMap));
        }

        return  $ret;
    }

    /**
     * 渲染资源
     * 将收集到的js css，变为html标签，异步js资源变为resorce map
     *
     * @param  string $type 资源类型
     * @return string $html html标签
     */
    public function render($type){
        $html = '';
        if ($type === 'js') {
            if (isset(self::$COLLECTION['js'])) {
                $arrURIs = &self::$COLLECTION['js'];
                foreach ($arrURIs as $uri) {
                    if ($uri === self::$FRAMEWORK) {
                        continue;
                    }
                    $html .= '<script type="text/javascript" src="' . self::$STA_URL . $uri . '"></script>' . PHP_EOL;
                }
            }
        } else if ($type === 'css') {
            if(isset(self::$COLLECTION['css'])) {
                $arrURIs = &self::$COLLECTION['css'];
                foreach ($arrURIs as $uri) {
                    $html .= '<link rel="stylesheet" type="text/css" href="' . self::$STA_URL . $uri . '">' . PHP_EOL;
                }
            }
        } else if($type === 'framework'){
            $html .= self::getModJsHtml();
        }

        echo $html;
        return $this;
    }

    /**
     * 加载资源依赖
     *
     * @param array    $arrRes  资源信息
     * @param boolean  $async   是否异步
     */
    private function loadDeps($arrRes, $async) {
        // require.async
        if (isset($arrRes['extras']) && isset($arrRes['extras']['async'])) {
            foreach ($arrRes['extras']['async'] as $uri) {
                $this->load($uri, true);
            }
        }
        if(isset($arrRes['deps'])){
            foreach ($arrRes['deps'] as $strDep) {
                $this->load($strDep, $async);
            }
        }
    }

    /**
     * 加载资源及其依赖
     *
     * @param string  $strName  资源路径
     * @param boolean $async   是否为异步（only js）
     * @return mixed
     */
    public function load($strName, $async = false){
        if(isset(self::$LOADED[$strName])) {
            // 同步资源优先级比异步资源高
            if (!$async && isset(self::$ASYNC_COLLECTION['res'][$strName])) {
                self::delAsyncDeps($strName);
            }
        } else {
            $arrMap    = self::$MAP;
            $arrPkg    = null;
            $arrPkgHas = [];
            if(isset($arrMap['res'][$strName])) {
                $arrRes = $arrMap['res'][$strName];

                if(in_array(V4_ENV, array('sim', 'online')) && isset($arrRes['pkg'])){
                    $arrPkg = $arrMap['pkg'][$arrRes['pkg']];
                    $strURI = $arrPkg['uri'];

                    // 包中的子资源标识为已加载
                    foreach ($arrPkg['has'] as $strResId) {
                        self::$LOADED[$strResId] = $strURI;
                    }

                    // 加载包中的子资源所需要的依赖
                    foreach ($arrPkg['has'] as $strResId) {
                        $arrHasRes = $arrMap['res'][$strResId];
                        $arrPkgHas[$strResId] = $arrHasRes;
                        $this->loadDeps($arrHasRes, $async);
                    }
                } else {
                    $strURI = $arrRes['uri'];
                    self::$LOADED[$strName] = $strURI;
                    $this->loadDeps($arrRes,  $async);
                }

                if ($async && $arrRes['type'] === 'js') {
                    if ($arrPkg) {
                        self::$ASYNC_COLLECTION['pkg'][$arrRes['pkg']] = $arrPkg;
                        self::$ASYNC_COLLECTION['res'] = array_merge((array)self::$ASYNC_COLLECTION['res'], $arrPkgHas);
                    } else {
                        self::$ASYNC_COLLECTION['res'][$strName] = $arrRes;
                    }
                } else {
                    self::$COLLECTION[$arrRes['type']][] = $strURI;
                }
            } else {
                self::triggerError($strName, 'unknown resource "' . $strName . '" load error', E_USER_NOTICE);
            }
        }

        return $this;
    }

    /**
     * 已经分析到的异步资源在后续被同步使用时在异步组里删除
     *
     * @param string  $strName
     * @param boolean $onlyDeps
     * @return mixed
     */
    private static function delAsyncDeps($strName, $onlyDeps = false) {
        if (isset(self::$ASYNC_DELETED[$strName])) {
            return true;
        } else {
            self::$ASYNC_DELETED[$strName] = true;

            $arrRes = self::$ASYNC_COLLECTION['res'][$strName];

            // first deps
            if (isset($arrRes['deps'])) {
                foreach ($arrRes['deps'] as $strDep) {
                    if (isset(self::$ASYNC_COLLECTION['res'][$strDep])) {
                        self::delAsyncDeps($strDep);
                    }
                }
            }

            if ($onlyDeps) {
                return true;
            }

            // second self
            if (isset($arrRes['pkg'])) {
                $arrPkg = self::$ASYNC_COLLECTION['pkg'][$arrRes['pkg']];
                $syncJs = isset(self::$COLLECTION['js']) ? self::$COLLECTION['js'] : [];
                if ($arrPkg && !in_array($arrPkg['uri'], $syncJs)) {
                    foreach ($arrPkg['has'] as $strHas) {
                        if (isset(self::$ASYNC_COLLECTION['res'][$strHas])) {
                            self::$LOADED[$strName] = $arrPkg['uri'];
                            self::delAsyncDeps($strHas, true);
                        }
                    }
                    self::$COLLECTION['js'][] = $arrPkg['uri'];
                }
            } else {
                //已经分析过的并且在其他文件里同步加载的资源，重新收集在同步输出组
                self::$COLLECTION['js'][] = $arrRes['uri'];
                self::$LOADED[$strName]   = $arrRes['uri'];
            }
        }
    }


    /**
     * 获取编译后的图片路径
     *
     * @param string $imgPath 原始图片路径
     * @return string
     */
    public function img($imgPath) {
        if (isset(self::$MAP['res'][$imgPath])) {
            echo self::$STA_URL . self::$MAP['res'][$imgPath]['uri'];
        } else {
            self::triggerError($imgPath, 'unknown image "' . $imgPath . '" load error', E_USER_NOTICE);
        }
    }

    /**
     * 用户代码自定义js组件，其没有对应的文件
     * 只有有后缀的组件找不到时进行报错
     *
     * @param string $strName       资源
     * @param string $strMessage    错误信息
     * @param int    $errorLevel    错误level
     */
    private static function triggerError($strName, $strMessage, $errorLevel) {
        $arrExt = ['js', 'css', 'tpl', 'html', 'xhtml', 'jpg', 'gif', 'png'];
        if (preg_match('/\.('.implode('|', $arrExt).')$/', $strName)) {
            trigger_error(date('Y-m-d H:i:s') . '   ' . $strName . ' ' . $strMessage, $errorLevel);
        }
    }

}

