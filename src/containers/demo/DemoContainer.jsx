import { connect } from 'react-redux';
import actions from '../../actions/index.js';
import Demo from './Demo';

const mapStateToProps = (state, ownProps) => ({
  list: state.demo.list || []
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: (id) => dispatch(actions.getDemo(id))
});

// 实际上，这个组件就是一个HOC
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Demo);