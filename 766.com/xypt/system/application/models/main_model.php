<?php
/**
 * PHP-
 * Copyright (c) 2010 网游
 * All rights reserved.
 *
 * @package    
 * @author     陈乔华 <cqhmb@163.com>
 * @copyright  2010 766项目
 * @version    v1.0
 */
class Main_model extends Model
{
	private $hd_table;
	private $logs_table;
	function __construct()
	{
		parent::Model();
		$this->hd_table = 'csol_info_101214';
		$this->logs_table = 'csol_logs_101214';
	}
	/**
	 * 查询用户在积分表是否存在
	 */
	function select_point($where){
		$this->db->limit(1,0);
		$this->db->where('uid',$where);
		$query=$this->db->get($this->hd_table);
		return $query->result_array();
	}
	/**
	 * 更新积分数据
	 *
	 * @param int $where  条件
	 * @param array $data 字段对应数据
	 * @return int 
	 */
	function update_point($where,$data){
		$this->db->where('uid',$where);
		$query=$this->db->update($this->hd_table,$data);
		return $this->db->affected_rows();
	}
	/**
	 * 增加积分数据
	 *
	 * @param array $data 字段对应数据
	 * @return int
	 */
	function insert_data($data){
		$this->db->insert($this->hd_table,$data);
		return $this->db->affected_rows();
	}
	/**
	 * 计算当天玩过次数
	 *
	 * @param int $userid
	 * @return unknown
	 */
	function logs_count($userid){
		$times=strtotime(date('Ymd'));
		$this->db->where('uid',$userid);
		$this->db->where('createtime',$times);
		$query=$this->db->get($this->logs_table);
		return $query->num_rows();
	}
	/**
	 * 增加积分日志数据
	 *
	 * @param array $data 字段对应数据
	 * @return int
	 */
	function insert_logs($data){
		$this->db->insert($this->logs_table,$data);
		return $this->db->affected_rows();
	}
}
?>