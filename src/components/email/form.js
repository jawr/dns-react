var React = require('react');
var Store = require('./store.js');
var Actions = require('./actions.js');
var Loader = require('react-loader');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			error: "",
			loaded: true
		};
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var query = this.refs.query.getDOMNode().value.trim();
		if (!query) { 
			return;
		}
		Actions.getDomainsByEmailQuery(query);
		this.errorReset();
	},
	componentWillMount: function() {
		Store.on('email.error', this.error);
		Store.on('email.loaded', this.loaded);
	},
	componentWillUnmount: function() {
		Store.off('email.error', this.error);
		Store.off('email.loaded', this.loaded);
	},
	loaded: function() {
		this.setState({
			loaded: true
		})
	},
	error: function(err) {
		this.setState({
			error: err,
			loaded: true
		});
	},
	errorReset: function() {
		this.setState({
			error: "",
			loaded: false
		});
	},
	render: function() {
		var loaded = "searchSubmit";
		var buttonText = "Search";
		if (!this.state.loaded) {
			loaded = "searchSubmit loading";
			buttonText = <i className="icon ion-ios-loop"></i>;
		}
		return (
			<div>
				<p className="noBottomMargin">Perform a domain check based on email.</p>
				<form onSubmit={this.handleSubmit}>
					<input className="searchBar u-pull-left" type="text" placeholder="admin@example.com" ref="query" />
					<button className={loaded} type="submit" disabled={!this.state.loaded}>
						{buttonText}
					</button>
				</form>
				<p>{this.state.error}</p>
			</div>
		);
	}
});
