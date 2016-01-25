var count = 0;
function fieldCount() {
	console.log("inc field");
	return count++;
}

Template['addAction'].helpers({
});

Template['addAction'].events({
	'click .add-field-button': function(e) {
		e.preventDefault();

		var container = document.getElementById('add-fields');
		var field = document.createElement("div");
		field.className = "field form-group";
		
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

		var addRadioButton = document.createElement("input");
		addRadioButton.id = "fieldAdd" + count;
		addRadioButton.name = "fieldOperation" + count;
		addRadioButton.type = "radio";
		addRadioButton.checked = true;
		addRadioButton.value = 0;
		field.appendChild(addRadioButton);
		
		var addLabel = document.createElement("span");
		addLabel.innerHTML = "Add";
		field.appendChild(addLabel);
		
		var multiplyRadioButton = document.createElement("input");
		multiplyRadioButton.id = "fieldMultiply" + count;
		multiplyRadioButton.name = "fieldOperation" + count;
		multiplyRadioButton.type = "radio";
		multiplyRadioButton.value = 1;
		field.appendChild(multiplyRadioButton);
		
		var multiplyLabel = document.createElement("span");
		multiplyLabel.innerHTML = "Multiply";
		field.appendChild(multiplyLabel);

		container.appendChild(field);
		fieldCount();
	},

	'submit #add-action': function(e) {
		e.preventDefault();

		var fieldsParsed = []
		var fields = $('#add-fields').children();
		for(var i = 1; i < fields.length; i++) {
			var fieldName = "fieldName" + (i-1);
			var fieldScale = "fieldScale" + (i-1);
			var fieldOperation = "fieldOperation" + (i-1);

			var fieldJson = {
				name: e.target[fieldName].value, 
				operation: parseInt(e.target[fieldOperation].value),
				scale: parseInt(e.target[fieldScale].value)
			}

			fieldsParsed.push(fieldJson);
			console.log(fieldJson);
		}

		var actionJson = {
			title: e.target.title.value,
			defaultPoints: parseInt(e.target.defaultPoints.value),
			dailyCap: parseInt(e.target.dailyCap.value),
			fields: fieldsParsed
		}
		console.log(actionJson);
		Meteor.call("addAction", actionJson)
	}
});
