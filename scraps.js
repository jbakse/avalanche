// show file progress cloudinary


{{#each files}}
    {{percent_uploaded}}<br/>
{{/each}}


// targeting forms


#layout-main {
	.form-group label {
		border: 1px solid green;
	}

	.form-group input[type="text"] {
		border: 1px solid red;
	}

	.form-group textarea {
		border: 1px solid orange;
	}

	.form-group [name="description"] {
		background-color: blue;
	}
}
