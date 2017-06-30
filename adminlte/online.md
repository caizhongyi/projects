＃快速发布说明 <br/>
＃author zhangyh <br />
＃可以发布上线的用户有:zhangyh ,caizy1,caizy,chenping,dutao 如果有其他需要增删的用户可以联系我<br />
＃通过git tag发布上线，当测试完成后准备上线时执行如下命令 <br />
  git tag onlineXXX      ＃online字段必须包含，后面的XXX随便写，可以写成online20150526等 <br />
  git push origin --tags #执行些命令时，如果该用户有发布上线的权限时，线上会自动更新，并加入mongo日志，如果没有权限则线上不会更新 <br />

