import * as React from 'react';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';

interface PlaygroundContainerProps { }
interface PlaygroundContainerState { }

function mapStateToProps(state: {}): PlaygroundContainerProps {
	return {
		//cart: state.cart
	};
}

function mapDispatchToProps(dispatch: (action: Action) => Dispatch<Action>): PlaygroundContainerProps {
	return {
		// onProductSelectionChange: (product: Product, isSelected: boolean) => {
		// 	const action = isSelected
		// 		? AddCartItemAction.create(product, 1)
		// 		: RemoveCartItemAction.create(product.itemId);
		//
		// 	dispatch(action);
		// }
	};
}

class PlaygroundContainer extends React.Component<PlaygroundContainerProps, PlaygroundContainerState> {
	public constructor(props: PlaygroundContainerState) {
		super(props);
		// this.state = {
		// 	isLoading: true,
		// 	productListings: [] //TODO cache previous?
		// };
	}

	public componentWillMount(): void {

	}

	public render(): any {

	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PlaygroundContainer);
