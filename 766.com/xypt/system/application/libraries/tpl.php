<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require_once(APPPATH .'libraries/smarty/Smarty.class.php');

class Tpl extends Smarty{
	function tpl(){
		parent::Smarty();
		$this->template_dir = APPPATH.'views';
		$this->compile_dir = APPPATH.'templates_c/';
        $this->left_delimiter="<!--{";
        $this->right_delimiter="}-->";
	}
}
?>