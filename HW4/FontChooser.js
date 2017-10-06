class FontChooser extends React.Component {
	constructor(props) {
		super(props);
		var min = this.props.min > 1 ? this.props.min : 1;
		var max = this.props.max;
		if (max < min) [min, max] = [max, min];
		var size = this.props.size;
		if (size < min) size = min;
		if (size > max) size = max;

		this.state = {isBold : this.props.bold == 'true',
						min : min,
						max : max,
						isHidden : true,
						size : parseInt(size)};
		
	}
	
	toggle() {
		this.setState({isHidden : !this.state.isHidden});

		var formElements = document.getElementsByClassName("form");
		for (let element of formElements) {
			element.hidden = this.state.isHidden;
		}
	}

	handleChangeCheckbox() {
		this.setState({isBold : !this.state.isBold});
	}

	decreaseFontSize() {
		if (this.state.size > this.state.min) {
			this.setState({size : this.state.size - 1});	
		}
	}
	
	increaseFontSize() {
		if (this.state.size < this.state.max) {
			this.setState({size : this.state.size + 1});	
		}
	}

	resetFontSize() {
		this.setState({size : parseInt(this.props.size)});
	}
  
	render() {
		var weight = this.state.isBold ? 'bold' : 'normal';
		var color = (this.state.size == this.state.min || this.state.size == this.state.max) ? 'red' : 'black';
		var inlineStyles = {fontSize: this.state.size, fontWeight : weight, color : color};	

		return (
			<div>
				<input class="form" type="checkbox" id="boldCheckbox" hidden='true' 
					defaultChecked={this.state.isBold} onChange={this.handleChangeCheckbox.bind(this)}/>
				<button class="form" id="decreaseButton" hidden='true' 
					onClick={this.decreaseFontSize.bind(this)}>-</button>
				<span class="form" id="fontSizeSpan" hidden='true' 
					onDoubleClick={this.resetFontSize.bind(this)}>{this.state.size}</span>
				<button class="form" id="increaseButton" hidden='true' 
					onClick={this.increaseFontSize.bind(this)}>+</button>
				<span id="textSpan" style={inlineStyles} 
					onClick={this.toggle.bind(this)}>{this.props.text}</span>
			</div>
		);
	}
}

