<?php
class poster_tag {

    public function __construct() {
        $this->db = pc_base::load_model('poster_model');
        $this->poster_space_db = pc_base::load_model('poster_space_model');
    }

    /**
     * 获得广告数据
     *
     */
    public function get_poster_data($data){
        $where = 'disabled = 0 and startdate <= '.time().' and enddate >= '.time();
        $spaceid = $data['spaceid'] ? intval($data['spaceid']) : 0 ;
        $limit = $data['limit'] ? intval($data['limit']) : 0 ;
        if($spaceid > 0){
            $where .= ' and spaceid = ' . $spaceid ;
        }
        $poster_data = $this->db->select($where, 'id,name, setting', $limit, 'listorder asc');

        return $poster_data;

    }

}
?>