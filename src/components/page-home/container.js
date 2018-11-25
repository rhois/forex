import { connect } from 'react-redux';
import { PageHomeComponent } from './component';
import {
  fetchLatest,
} from './action';


export const mapStateToProps = state => state.pageHome;

export const mapDispatchToProps = dispatch => ({
  updateLatest: () => dispatch(fetchLatest()),
});

export const PageHomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageHomeComponent);

export default PageHomeContainer;
