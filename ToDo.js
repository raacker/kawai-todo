import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import PropTypes from "prop-types";

const { height, width } = Dimensions.get('window');

export default class ToDo extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        deleteToDo: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired,
    }
    constructor (props) {
        super(props);
        this.state = {
            isEditing: false,
            toDoValue: props.text,
        };
    }
	render() {
        const { isEditing, toDoValue } = this.state;
        const { text, isCompleted, deleteToDo, id } = this.props;
		return (
			<View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]} />
                    </TouchableOpacity>
                    { isEditing ? (
                        <TextInput
                            style={[
                                styles.text,
                                styles.input,
                                isCompleted ? styles.completedText : styles.uncompletedText
                            ]}
                            value={toDoValue}
                            multiline={true}
                            onChangeText={this._controlInput}
                            returnKeyType={'done'}
                            onBlur={this._endEditing}
                            underlineColorAndroid={'transparent'}
                        />
                    ) :
                        <Text style={[styles.text, isCompleted ? styles.completedText : styles.uncompletedText]}>
                            {text}
                        </Text>
                    }
                </View>
                {isCompleted ?
                    null
                    :
                    isEditing ? 
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._endEditing}>
                            <View style={styles.actionContainier}>
                                <Text style={styles.actionText}>✅</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    : 
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._startEditing}>
                            <View style={styles.actionContainier}>
                                <Text style={styles.actionText}>✏️</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { deleteToDo(id) }}>
                            <View style={styles.actionContainier}>
                                <Text style={styles.actionText}>❎</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                }
            </View>
		);
	}

	_toggleComplete = () => {
		this.setState(prevState => {
			return {
				isCompleted: !prevState.isCompleted,
			};
		});
    };
    
    _startEditing = () => {
        const { text } = this.props;
        this.setState({
            isEditing: true,
            toDoValue: text,
        });
    }

    _endEditing = () => {
        this.setState({
            isEditing: false,
        });
    }
    
    _controlInput = (text) => {
        this.setState({
            toDoValue: text,
        });
    }
}

const styles = StyleSheet.create({
	container: {
		width: width - 50,
		borderBottomColor: '#bbb',
		borderBottomWidth: StyleSheet.hairlineWidth,
		flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    column: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width / 2,
    },
	circle: {
		width: 30,
		height: 30,
		borderRadius: 15,
		borderColor: 'red',
		borderWidth: 3,
		marginRight: 20,
	},
	completedCircle: {
		borderColor: '#bbb',
	},
	uncompletedCircle: {
		borderColor: '#f23657',
	},
	text: {
		fontWeight: '600',
		fontSize: 20,
		marginVertical: 20,
	},
	completedText: {
		color: '#bbb',
		textDecorationLine: 'line-through',
	},
	uncompletedText: {
		color: '#353839',
    },
    actions: {
        flexDirection: 'row',
    },
    actionContainier: {
        marginVertical: 10,
        marginHorizontal: 10,
    }
});
