<?php
/**
 * PHP-
 * Copyright (c) 2010 ����
 * All rights reserved.
 *
 * @package    
 * @author     ���ǻ� <cqhmb@163.com>
 * @copyright  2010 766��Ŀ
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
	 * ��ѯ�û��ڻ��ֱ��Ƿ����
	 */
	function select_point($where){
		$this->db->limit(1,0);
		$this->db->where('uid',$where);
		$query=$this->db->get($this->hd_table);
		return $query->result_array();
	}
	/**
	 * ���»�������
	 *
	 * @param int $where  ����
	 * @param array $data �ֶζ�Ӧ����
	 * @return int 
	 */
	function update_point($where,$data){
		$this->db->where('uid',$where);
		$query=$this->db->update($this->hd_table,$data);
		return $this->db->affected_rows();
	}
	/**
	 * ���ӻ�������
	 *
	 * @param array $data �ֶζ�Ӧ����
	 * @return int
	 */
	function insert_data($data){
		$this->db->insert($this->hd_table,$data);
		return $this->db->affected_rows();
	}
	/**
	 * ���㵱���������
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
	 * ���ӻ�����־����
	 *
	 * @param array $data �ֶζ�Ӧ����
	 * @return int
	 */
	function insert_logs($data){
		$this->db->insert($this->logs_table,$data);
		return $this->db->affected_rows();
	}
}
?>