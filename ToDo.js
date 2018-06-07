import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default class ToDo extends Component {
	state = {
		isEditing: false,
        isCompleted: false,
	};
	render() {
		const { isEditing, isCompleted } = this.state;
		return (
			<View style={styles.container}>
                <View style={styles.column}>
                    <TouchableOpacity onPress={this._toggleComplete}>
                        <View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]} />
                    </TouchableOpacity>
                    <Text style={[styles.text, isCompleted ? styles.completedText : styles.uncompletedText]}>
                        Hello I'm to do
                    </Text>
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
                        <TouchableOpacity>
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
        this.setState({
            isEditing: true,
        });
    }

    _endEditing = () => {
        this.setState({
            isEditing: false,
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
        justifyContent: 'space-between',
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
