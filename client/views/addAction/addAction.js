// Number of fields already added to action form.
var count = 0;
function fieldCount() {
	return count++;
}

Template['addAction'].helpers({
});

Template['addAction'].events({
	// Add new fields to action being added.
	'click .add-field-button': function(e) {
		e.preventDefault();

		var container = document.getElementById('new-fields');
		var field = document.createElement("div");
		field.id = "field" + count;
		field.className = "field form-group";

		var removeButton = document.createElement("input");
		removeButton.name = "" + count;
		removeButton.className = "removeButton inline-icon";
		removeButton.type = "image";
		removeButton.src = "/images/remove.svg";
		field.appendChild(removeButton);
		
		var name = document.createElement("input");
		name.name = "fieldName" + count;
		name.className = "form-control";
		name.type = "text";
		name.placeholder = "Field name";
		field.appendChild(name);

		var scale = document.createElement("input");
		scale.name = "fieldScale" + count;
		scale.className = "form-control";
		scale.type = "number";
		scale.min = 0;
		scale.placeholder = "Field weight";
		field.appendChild(scale);

		container.appendChild(field);
		fieldCount();
	},

	// Remove field from action.
	'click .removeButton': function(e) {
		e.preventDefault();
		var index = e.target.name;
		var fieldId = "field" + index;
		var parent = document.getElementById('new-fields');
		var child = document.getElementById(fieldId);
		parent.removeChild(child);
	},

	// Add action to group.
	'submit #add-action': function(e) {
		e.preventDefault();

		var fieldsParsed = [];
		var fields = $('#new-fields').children();

		if (fields.length > 0) {
			for(var i = 0; i < fields.length; i++) {
				var fieldName = "fieldName" + i;
				var fieldScale = "fieldScale" + i;
				var fieldOperation = "fieldOperation" + i;

				var fieldJson = {
					name: e.target[fieldName].value, 
					operation: 0,
					scale: parseInt(e.target[fieldScale].value)
				}

				fieldsParsed.push(fieldJson);
			}
		}		

		var actionJson = {
			title: e.target.title.value,
      		description: e.target.description.value,
			category: e.target.category.value,
			defaultPoints: parseInt(e.target.defaultPoints.value),
			dailyCap: parseInt(e.target.dailyCap.value),
			fields: fieldsParsed
		};

		Meteor.call("addAction", actionJson, function(err, result){
            if(err){
                console.log(err);
            } else {
            	e.target.title.value = '';
            	e.target.description.value = '';
            	e.target.category.value = '';
				e.target.defaultPoints.value = '';
				e.target.dailyCap.value = '';  
                $("#new-fields").html('');
				closeActionForm(result);
            }
        });
        
		count = 0;
	}
});
