function closeDialog()
{
    jQuery('#popup').dialog('close');
    jQuery('#popup').remove();
}
function linkToNew(model, widget_id, url, ws_url, type, name)
{
    //    if (document.getElementById('popup')){
    //        var div = document.getElementById('popup');
    //        div.innerHTML='';
    //    }
    //    else
    //    {
    var div = document.createElement("div");
    div.setAttribute('id', 'popup');
    document.body.insertBefore(div, document.body.firstChild)
    //    }


    jQuery('#popup').hide();
    jQuery.ajax({
        url: url,
        context: document.body,
        success: function(data) {
            jQuery('#popup').html(data);
            jQuery('#popup').dialog();
        }
    })
    

}

function update(model, widget_id, ws_url, type, name)
{
    jQuery.getJSON(
        ws_url,
        "model="+model,
        function(data)
        {
            if (type == "select")
            {
                updateSelect(widget_id, name, data);
            }
            else if (type == "radio")
            {
                updateRadio(widget_id, name, data);
            }
            else if (type == "checkbox")
            {
                updateCheckbox(widget_id, name, data);
            }
        }
        );
}


function updateSelect(widget_id, name, data)
{
    jQuery(widget_id+" option").detach();
    jQuery.each(data, function(k, v)
    {
        jQuery('<option value="'+k+'">'+v+'</option>').appendTo(jQuery(widget_id));
    });
}

function updateRadio(widget_id, name, data)
{
    div_class = name.slice(name.indexOf("[")+1, name.length-1);
    jQuery("div.sf_admin_form_field_"+div_class+" ul.radio_list li").detach();

    jQuery.each(data, function(k, v)
    {
        if (jQuery("div.sf_admin_form_field_"+div_class+" ul.radio_list").html() == undefined)
        {
            jQuery("div.sf_admin_form_field_"+div_class+" div.content").prepend('<ul class="radio_list"></ul>');
        }
        new_widget_id = widget_id.slice(1)+"_"+k;
        jQuery("div.sf_admin_form_field_"+div_class+" ul.radio_list").append('<li><input name="'+name+'" type="radio" value="'+k+'" id="'+new_widget_id+'"> <label for="'+new_widget_id+'">'+v+'</label></li>');
    });
}

function updateCheckbox(widget_id, name, data)
{
    div_class = name.slice(name.indexOf("[")+1, name.length-1);
    jQuery("div.sf_admin_form_field_"+div_class+" ul.checkbox_list li").detach();
    jQuery.each(data, function(k, v)
    {
        if (jQuery("div.sf_admin_form_field_"+div_class+" ul.checkbox_list").html() == undefined)
        {
            jQuery("div.sf_admin_form_field_"+div_class+" div.content").prepend('<ul class="checkbox_list"></ul>');
        }
        new_widget_id = widget_id.slice(1)+"_"+k;
        jQuery("div.sf_admin_form_field_"+div_class+" ul.checkbox_list").append('<li><input name="'+name+'[]" type="checkbox" value="'+k+'" id="'+new_widget_id+'"> <label for="'+new_widget_id+'">'+v+'</label></li>');
    });
}

//esta funcion debe ser llamada por el formulario que  aparece en el modal, para guardar los datos y no redireccionar
function saveNewChoice()
{
    var url = jQuery('#popup form').attr('action');  //la url del action del formulario
    var datos = jQuery('#popup form').serialize(); // los datos del formulario
    jQuery.ajax({
        type: 'POST',
        url: url,
        data: datos,
        success:closeDialog()
    });

//update(model, widget_id, ws_url, type, name);

}