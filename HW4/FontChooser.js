class FontChooser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {isBold : this.props.bold == 'true', 
								 size : parseInt(this.props.size)};
		
	}
		
	
  
	render() {
		var weight = this.state.isBold ? 'bold' : 'normal';
		var inlineStyles = {fontSize: this.state.size, fontWeight : weight};	
		
		return (
			<div>
				<input type="checkbox" id="boldCheckbox" hidden/>
				<button id="decreaseButton" hidden='true'>-</button>
				<span id="fontSizeSpan" hidden='true'>{this.props.size}</span>
				<button id="increaseButton" hidden='true'>+</button>
				<span id="textSpan" style={inlineStyles}>{this.props.text}</span>
				
				// <span>{typeof this.state.size}</span>
				// <span>{weight}</span>
			</div>
		);
	}
}

