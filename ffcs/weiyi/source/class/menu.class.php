<?php
/**
 * 权限判断
 */

class menu {
    private $menu = 'ims_menu';
    private $priv = 'ims_menu_priv';

    /**
     * 按父ID查找菜单子项
     * @param integer $parentid   父菜单ID
     * @param integer $with_self  是否包括他自己
     */
    function admin_menu($parentid, $with_self = 0) {
        global $_W;
        //加上用户模块的菜单扣去公众账号禁用的菜单
        if($_W['weid']){
            $current_uid = pdo_fetchcolumn("select uid from ".tablename('wechats')." where weid = ".$_W['weid']);
        }else{
            $current_uid = $_W['uid'];
        }
        if($current_uid){
            $current_groupid = pdo_fetchcolumn("SELECT groupid FROM ".tablename('members')." WHERE uid='".$current_uid."'");
            $parentid = intval($parentid);
            if(!$_W['isfounder']){
                $sql = "select a.* from ".$this->menu." as a, ".$this->priv." as b where parentid = ".$parentid." and groupid = ".$current_groupid." and display = 1 and a.id = b.menuid order by listorder asc";
            }else{
                $sql = "select * from ".$this->menu." where parentid = ".$parentid." and display = 1 order by listorder asc";
            }
            $result = pdo_fetchall($sql);
            if($with_self) {
                $result2[] = pdo_query("select * from ".$this->menu." where id = ".$parentid);
                $result = array_merge($result2,$result);
            }
            //权限检查
            if($_W['isfounder']) return $result;
            //加上用户模块的菜单扣去公众账号禁用的菜单
            $modules_result = pdo_fetchall("select m.* from ".$this->menu." m left join ".tablename('modules')." mo on(m.modules=mo.name) left join ".tablename('members_modules')." mm on(mo.mid=mm.mid) where mm.uid = ".$current_uid." and m.parentid = ".$parentid." and m.display = 1 order by m.listorder asc");
            $result = array_merge($modules_result,$result);
            $permissions_result = pdo_fetchall("select m.* from ".$this->menu." m left join ".tablename('modules')." mo on(m.modules=mo.name) left join ".tablename('members_permission')." mp on(mo.mid=mp.resourceid) where mp.uid = ".$current_uid." and mp.type='1' and m.parentid = ".$parentid." and m.display = 1 order by m.listorder asc");
            $result = array_merge($permissions_result,$result);
            $tmp_arr = array();
            foreach($result as $k => $v) {
                if(in_array($v['id'], $tmp_arr)) {
                    unset($result[$k]);
                } else {
                    $tmp_arr[] = $v['id'];
                }
            }
            if($_W['weid']){
                $un_result = pdo_fetchall("select m.id from ".$this->menu." m left join ".tablename('modules')." mo on(m.modules=mo.name) left join ".tablename('wechats_modules')." wm on(mo.mid=wm.mid) where wm.enabled='0' and wm.weid = ".$_W['weid']." and m.parentid = ".$parentid." and m.display = 1");
                $un_array = array();
                foreach($un_result as $un){
                    $un_array[] = $un['id'];
                }
                if($un_array){
                    foreach($result as $key=>$val){
                        if(in_array($val['id'],$un_array)){
                            unset($result[$key]);
                        }
                    }
                }
            }

            $sort_order = array();

            foreach ($result as $sk => $sv) {
                $sort_order[$sk] = $sv['listorder'];
            }

            array_multisort($sort_order, SORT_ASC, $result);

            /*$array = array();
            foreach($result as $v) {
                $action = $v['d'];
                if(preg_match('/^public_/',$action)) {
                    $array[] = $v;
                } else {
                    if(preg_match('/^ajax_([a-z]+)_/',$action,$_match)) $action = $_match[1];
                    $where = "m='".$v['m']."' and a='".$v['a']."'";
                    if(!empty($v['d'])) $where .= " and d='".$v[d]."'";
                    //当代码写在modules下的时候验证name参数
                    if($v['m'] == 'index' && $v['a'] == 'module' && !empty($v['n'])){
                        $where .= " and n = '".$v['n']."'";
                    }

                    if($_W['member']['groupid']){
                        $where .= " and groupid = ".$_W['member']['groupid'];
                        $r = pdo_fetch("select * from ".$this->menu." as a,".$this->priv." as b where ".$where." and a.id=b.menuid");
                    }else{
                        $r = false;
                    }
                    if($r) $array[] = $v;
                }
            }
            return $array;*/
            return $result;
        }
        return '';
    }

    /**
     * 检查权限
     * */
    public function check_priv(){
        global $_W, $_GPC;

        if($_W['isfounder']) return true;
        $file = explode('/', $_SERVER['PHP_SELF']);
        $m = substr($file[2], 0, sizeof($file[2])-5); //取文件名
        $a = isset($_GPC['act']) && !empty($_GPC['act']) ? $_GPC['act'] : '';
        $d = isset($_GPC['do']) && !empty($_GPC['do']) ? $_GPC['do'] : '';
        $n = isset($_GPC['name']) && !empty($_GPC['name']) ? $_GPC['name'] : '';

        if(preg_match('/^public_/', $a) || preg_match('/^ajax_/', $a)) return true;
        if(preg_match('/^public_/', $d) || preg_match('/^ajax_/', $d)) return true;

        //跳过无需鉴权的方法
        $_sql = "select * from ims_menu where ispublic = 0";
        $_rs = pdo_fetchall($_sql);
        if(!empty($_rs)){
            foreach ($_rs as $service){
                if(empty($service['m'])){
                    continue;
                }elseif(!empty($service['m']) && empty($service['a']) && empty($service['d']) && empty($service['n']) && $m == $service['m']){
                    //当为单页面 没有其他参数的时候
                    return true;
                }else{
                    if(!empty($service['a']) && $m == $service['m'] && $a == $service['a']){
                        if(!empty($service['d']) && $d == $service['d']){
                            if(!empty($service['n']) && $n == $service['n']){
                                return true;
                            }
                            return true;
                        }
                        return true;
                    }
                }

            }
        }
        if($_W['uid']){
            if($_W['member']['groupid']){
                $groupid = $_W['member']['groupid'];
                $sql = "select * from ims_menu as a, ims_menu_priv as b where b.groupid = ".$groupid." and a.m = '".$m."'";
                if(!empty($a)){
                    $sql .= " and a.a='".$a."'";
                }
                if(!empty($d)){
                    $sql .= " and a.d='".$d."'";
                }
                if(!empty($n)){
                    $sql .= " and a.n='".$n."'";
                }
                $sql .= " and a.id = b.menuid";
                $result = pdo_fetch($sql);
            }else{
                $result = false;
            }

            if($result === false) message('您没有权限操作该项', '');
        }
    }
}
?>