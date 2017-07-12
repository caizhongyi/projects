<?php
/**
 *  extention.func.php 用户自定义函数库
 *
 * @copyright			(C) 2005-2010 PHPCMS
 * @license				http://www.phpcms.cn/license/
 * @lastmodify			2010-10-27
 */
/**
 * 生成URL地址
 * @param <type> $action
 * @param <type> $controller
 * @param <type> $module
 * @param <type> $params
 * @param <type> $host
 */
function buildurl($action = '', $controller = '', $module = '', $params = array(), $urlpre = '') {
    static $_urlpre;

    if (! isset($_urlpre)) {
        $site = siteinfo(get_siteid());

        $url = $site['domain'];


        $url = rtrim($url, '/');
        $url = $url . WEB_PATH;
        if (empty($url)) {
            $url = APP_PATH;
        }
        $_urlpre = rtrim($url, '/') . '/';
    }

    if (empty($module) && empty($controller) && empty($action)) {
        return $_urlpre;
    }

    $controller = empty($controller) ? ROUTE_C : $controller;
    $module = empty($module) ? ROUTE_M : $module;

    if ($action == 'show' && $module == 'content' && $controller == 'index') {
        if ($params['islink'] && ! empty($params['url'])) {
            return $params['url'];
        }

        //字段数超过7个的时候，认为是完整的内容数组，只读取部分参数
        //推荐位字段数约为9个
        if (isset($params['catid']) && isset($params['id']) && count($params) > 7) {
            $params = array(
                'catid' => $params['catid'],
                'id' => $params['id']
            );
        }

        //_开头的参数，认为是自定义的参数，附加进去。待有后续需求再实现
    }

    $url = empty($urlpre) ? $_urlpre . 'index.php?' : $urlpre;

    $params = array_merge(array(
                              'm' => $module,
                              'c' => $controller,
                              'a' => $action
                          ), $params);

    $url .= http_build_query($params);

    return $url;
}
?>