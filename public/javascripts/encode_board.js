$(document).ready(function(){var canvas=new fabric.Canvas('canvas');$('#toolbar > button').click(function(e){var btn_id=e.target.id;$('#toolbar > button').removeClass('disabled');$('#'+btn_id).addClass('disabled');canvas.isDrawingMode=false});$('#text-add').click(function(){var text=$('#text-content').val();var color=$('#text-color').val();var t=new fabric.Text(text,{fill:color});canvas.add(t)});$("input[name='shape']").change(function(e){var shape=$(e.target).val();console.log(shape);switch(shape){case'circle':$('#input2').prop('disabled',true);break;case'ellipse':$('#input2').prop('disabled',false);break;case'rect':$('#input2').prop('disabled',false);break;case'heart':$('#input2').prop('disabled',true);break}});$('#add-shape-to').click(function(e){e.preventDefault();var shape=$('input[name=shape]:checked').val();switch(shape){case'circle':var r=(parseInt($('#input1').val(),10)||1)*11.8/2;var x=(parseInt($('#inputx').val(),10)||1)*11.8;var y=(parseInt($('#inputy').val(),10)||1)*11.8;var circle=new fabric.Circle({radius:r,fill:'#cccccc',left:x,top:y,opacity:0.5});canvas.add(circle);break;case'ellipse':var h=(parseInt($('#input1').val(),10)||1)*11.8/2;var w=(parseInt($('#input2').val(),10)||1)*11.8/2;var x=(parseInt($('#inputx').val(),10)||1)*11.8;var y=(parseInt($('#inputy').val(),10)||1)*11.8;var ellipse=new fabric.Ellipse({rx:w,ry:h,fill:'#cccccc',left:x,top:y,opacity:0.5});canvas.add(ellipse);break;case'rect':var h=(parseInt($('#input1').val(),10)||1)*11.8;var w=(parseInt($('#input2').val(),10)||1)*11.8;var x=(parseInt($('#inputx').val(),10)||1)*11.8;var y=(parseInt($('#inputy').val(),10)||1)*11.8;var rect=new fabric.Rect({width:w,height:h,fill:'#cccccc',left:x,top:y,opacity:0.5});canvas.add(rect);break;case'heart':var h=(parseInt($('#input1').val(),10)||1)*11.8;var w=(parseInt($('#input2').val(),10)||1)*11.8;var x=(parseInt($('#inputx').val(),10)||1)*11.8;var y=(parseInt($('#inputy').val(),10)||1)*11.8;var svg_path='/template_svg/heart3.svg';fabric.loadSVGFromURL(svg_path,function(objects,options){var obj=fabric.util.groupSVGElements(objects,options);obj.scaleToHeight(h);obj.left=x;obj.top=y;obj.opacity=0.5;canvas.add(obj)});break}});$('#tool-sidebar').click(function(e){e.preventDefault();$("#wrapper").toggleClass("toggled")});$('#tool-save').click(function(){$('#myModal').modal()});$('#tool-clear').click(function(){canvas.clear()});$('#crop').click(function(){$('#myModal').modal('hide');var name=$("#templateName").val();var desc=$("#templateDesc").val();var json=JSON.stringify(canvas)alert(json);var url="/template/new";var posting=$.post(url,{name:name,description:desc,obj:json});posting.done(function(data){window.location.replace("/template")})});function browser_check(){if(window.File&&window.FileReader&&window.FileList&&window.Blob){}else{alert('当前网页浏览器版本过低，请下载新版浏览器。建议使用新版google浏览器或火狐浏览器。')}}browser_check();$('#bg-color').change(function(){var color=$('#bg-color').val();canvas.setBackgroundColor(color,canvas.renderAll.bind(canvas))})});