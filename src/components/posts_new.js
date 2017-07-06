import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
	onSubmit(values) {
		console.log(values);
	}

	renderField(field) {
		const { meta: { touched, error } } = field;
		const className = `form-group ${touched && error ? 'has-danger': ''}`;

		return (
			<div className={className}>
				<label htmlFor={field.name}>{field.label}</label>
				<input
					className="form-control"
					type="text"
					{...field.input}
				/>
				<div className="text-help">
					{touched ? error : ''}
				</div>
			</div>
		);
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<div>
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<Field 
						label="Title"
						name="title"
						component={this.renderField}
					/>
					<Field 
						label="Categories"
						name="categories"
						component={this.renderField}
					/>
					<Field 
						label="Post Content"
						name="content"
						component={this.renderField}
					/>
					<button type="submit" className="btn btn-primary">Submit</button>
				</form>
			</div>
		);
	}
}


function validate(values) {
	const errors = {};

	if (!values.title) {
		errors.title = 'Enter a title!';
	} else if (values.title.length < 3) {
		errors.title = 'Enter a title that is at least 3 characters!';
	}

	if (!values.categories) {
		errors.categories = 'Enter some categories!';
	}

	if (!values.content) {
		errors.content = 'Enter some content!';
	}

	return errors;
}

export default reduxForm({
	validate,
	form: 'PostsNewForm'
})(PostsNew);