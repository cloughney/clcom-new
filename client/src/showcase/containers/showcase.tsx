import * as React from 'react';
import { Action, Dispatch } from 'redux';
import { connect } from 'react-redux';

interface ShowcaseContainerProps { }
interface ShowcaseContainerState { }

function mapStateToProps(state: {}): ShowcaseContainerProps {
	return {
		//cart: state.cart
	};
}

function mapDispatchToProps(dispatch: Dispatch<Action>): ShowcaseContainerProps {
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

class ShowcaseContainer extends React.Component<ShowcaseContainerProps, ShowcaseContainerState> {
	public constructor(props: ShowcaseContainerState) {
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
)(ShowcaseContainer);
