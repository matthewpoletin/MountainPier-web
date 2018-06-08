"use strict";

import React, { Component } from "react";
import Plot from "react-plotly.js";
import * as _ from "lodash";
import "./adminHome.css";
import ChartService from "../../../service/chartService";

/**
 * Class for admin home page
 * @author Matthew Poletin
 */
class AdminHome extends Component {

	componentWillMount() {
		this.setState({
			loading: true,
			logins: undefined,
		});

		ChartService.getLogins()
			.then((loginsResponse) => {
				this.setState({
					logins: loginsResponse.content,
					loading: false,
				});
			}).catch(() => {
				this.setState({
					loading: false,
				});
			});
	}

	render() {
		return (
			<div className="admin-home">
				{this.logins()}
			</div>
		);
	}

	logins() {
		if (this.state.loading) {
			return (
				<div>
					Loading...
				</div>
			);
		} else {
			if (this.state.logins === undefined) {
				return (
					<div className="error-block">
						Error in request
					</div>
				);
			} else {
				const logins = this.state.logins;
				console.log(JSON.stringify(logins));

				const minDate = _.minBy(_.keys(logins), (date) => {
					return logins[date]
				});
				const maxDate = _.maxBy(_.keys(logins), (o) => {
					return logins[o]
				});
				console.log(minDate);
				console.log(maxDate);
				return (
					<Plot
						data={[
							{
								x: ['2017-01-01', '2017-06-01', '2018-01-01'],
								y: [1, 3, 6],
								type: 'scatter',
								mode: 'lines+points',
								name: 'Daily Logins',
								marker: {color: 'red'},
							},
						]}
						layout={{
							title: 'Users logins',
							xaxis: {
								autorange: true,
								range: ['2017-01-01', '2018-01-01'],
								rangeselector: {
									buttons: [
										{
											count: 1,
											label: '1m',
											step: 'month',
											stepmode: 'backward'
										},
										{
											count: 6,
											label: '6m',
											step: 'month',
											stepmode: 'backward'
										},
										{step: 'all'}
									]
								},
								rangeslider: {range: ['2018-02-17', Date.now().toString()]},
								type: 'date'
							},
							yaxis: {
								autorange: false,
								range: [0, 100],
								type: 'linear'
							},
						}}
					/>
				);
			}
		}
	}

}

export default AdminHome;
