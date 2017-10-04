class FontChooser extends React.Component {

    constructor(props) {
	super(props);
    }
    

    render() {

	return(
	       <div>
	       <input type="checkbox" id="boldCheckbox" hidden='true'/>
	       <button id="decreaseButton" hidden='true'>-</button>
	       <span id="fontSizeSpan" hidden='true'>{this.props.size}</span>
	       <button id="increaseButton" hidden='true'>+</button>
	       <span id="textSpan">{this.props.text}</span>
	       </div>
	);
    }
}

