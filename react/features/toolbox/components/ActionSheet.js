import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
    Animated,
    Dimensions,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

const BUTTON_H = 55;
const MAX_HEIGHT = Dimensions.get('window').height * 0.9

console.log('YYYYY');
console.log(MAX_HEIGHT);

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        opacity: 0.4,
        backgroundColor: '#000'
    }
});

const sheetStyle = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'row'
    },
    bd: {
        flex: 1,
        alignSelf: 'flex-end',
        backgroundColor: '#fff'
    }
});

const btnStyle = StyleSheet.create({
    wrapper: {
        height: BUTTON_H,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 18
    }
});


class ActionSheet extends Component {
    constructor (props) {
        super(props)
        this.scrollEnabled = false
        //this.translateY = this._calculateHeight(props)
        //this.height = Dimensions.get('window').height * 0.9;
        this.height = 0;
        this.state = {
            visible: false,
            sheetAnim: new Animated.Value()
        }
        this._cancel = this._cancel.bind(this)

        this._onLayout = this._onLayout.bind(this);
    }

    //componentWillReceiveProps (nextProps) {
    //    this.translateY = this._calculateHeight(nextProps)
    //}

    show () {
        this.setState({visible: true})
        this._showSheet()
    }

    hide (index) {
        this._hideSheet(() => {
            this.setState({visible: false})
            this.props.onPress(index)
        })
    }

    _cancel () {
        this.hide()
    }

    _showSheet () {
        Animated.timing(this.state.sheetAnim, {
            toValue: 0,
            duration: 500
        }).start()
    }

    _hideSheet (callback) {
        Animated.timing(this.state.sheetAnim, {
            toValue: this.height,
            duration: 150
        }).start(callback)
    }

    _calculateHeight (props) {
        let count = props.options.length
        let height = BUTTON_H * count
        if (height > MAX_HEIGHT) {
            this.scrollEnabled = true
            return MAX_HEIGHT
        } else {
            this.scrollEnabled = false
            return height
        }
    }

    _onLayout(event) {
        console.log('XXX ON LAYOUT');
        console.log(event.nativeEvent.layout);

        const { height } = event.nativeEvent.layout;
        const maxHeight = Dimensions.get('window').height * 0.9;
        const newHeight = Math.min(height, maxHeight);

        if (this.height !== newHeight) {
            //return;
            console.log('AAAAAAA');
            this.height = newHeight;
            this.state.sheetAnim.setValue(this.height);
        }
    }

    _createButton (title, fontColor, index, style) {
        let titleNode = null
        if (React.isValidElement(title)) {
            titleNode = title
        } else {
            titleNode = <Text style={[btnStyle.title, {color: fontColor}]}>{title}</Text>
        }
        return (
            <TouchableHighlight
                key={index}
                activeOpacity={1}
                underlayColor="#f4f4f4"
                style={[btnStyle.wrapper, style || {}]}
                onPress={this.hide.bind(this, index)}
            >
                {titleNode}
            </TouchableHighlight>
        )
    }

    _renderOptions () {
        let {options, tintColor} = this.props
        return options.map((title, index) => {
            return this._createButton(title, tintColor, index)
        })
    }

    render () {
        const { visible, sheetAnim } = this.state
        return (
            <Modal
                visible={visible}
                transparent={true}
                animationType="none"
                onRequestClose={this._cancel}
            >
                <View style={sheetStyle.wrapper}>
                    <Text style={styles.overlay} onPress={this._cancel}></Text>
                    <Animated.View
                        style={[sheetStyle.bd, {transform: [{translateY: sheetAnim}]} ]}
                    >
                        <ScrollView
                            onLayout = { this._onLayout }
                            scrollEnabled={this.scrollEnabled}
                            contentContainerStyle={sheetStyle.options}>
                            {this._renderOptions()}
                        </ScrollView>
                    </Animated.View>
                </View>
            </Modal>
        )
    }
}

ActionSheet.propTypes = {
    options: PropTypes.arrayOf((propVal, key, componentName, location, propFullName) => {
        if (typeof propVal[key] !== 'string' && !React.isValidElement(propVal[key])) {
            return new Error(
                'Invalid prop `' + propFullName + '` supplied to' +
                ' `' + componentName + '`. Validation failed.'
            )
        }
    }),
    tintColor: PropTypes.string,
    onPress: PropTypes.func
}

ActionSheet.defaultProps = {
    tintColor: '#007aff',
    onPress: () => {}
}

export default ActionSheet