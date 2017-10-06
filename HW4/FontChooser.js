class FontChooser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {isBold : this.props.bold == 'true',
						isHidden : true,
						size : parseInt(this.props.size)};
		
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
	
  
	render() {
		var weight = this.state.isBold ? 'bold' : 'normal';
		var inlineStyles = {fontSize: this.state.size, fontWeight : weight};	

		return (
			<div>
				<input class="form" type="checkbox" id="boldCheckbox" hidden='true' defaultChecked={this.state.isBold} onChange={this.handleChangeCheckbox.bind(this)}/>
				<button class="form" id="decreaseButton" hidden='true'>-</button>
				<span class="form" id="fontSizeSpan" hidden='true'>{this.props.size}</span>
				<button class="form" id="increaseButton" hidden='true'>+</button>
				<span id="textSpan" style={inlineStyles} onClick={this.toggle.bind(this)}>{this.props.text}</span>
			</div>
		);
	}
}

