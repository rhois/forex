import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  Icon,
  Grid,
  Segment,
  Button,
  Dropdown,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import { styles } from './styles';

export class PageHomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnable: false,
      currentValue: '',
      base: 'USD',
      initDefault: 10,
      symbols: ['IDR', 'EUR', 'GBP', 'SGD'],
      loading: false,
    };
  }
  componentDidMount() {
    const {
      updateLatestSymbols,
    } = this.props;

    setTimeout(() => {
      updateLatestSymbols(
        this.state.base,
        this.state.initDefault,
        this.state.symbols,
      );
    }, 500);
  }
  onSubmitCurreny() {
    const {
      updateLatestSymbols,
      resetData,
    } = this.props;
    const {
      base,
      initDefault,
      symbols,
      currentValue,
    } = this.state;
    let sym = symbols;
    sym.push(currentValue);
    this.setState({
      isEnable: false,
      symbols: sym,
    });
    resetData();
    setTimeout(() => {
      updateLatestSymbols(base, initDefault, symbols);
    }, 500);
  }
  deleteItem(val) {
    const {
      updateLatestSymbols,
      resetData,
    } = this.props;
    const {
      base,
      initDefault,
      symbols,
    } = this.state;
    const filterArray = symbols.filter(function(ele){
      return ele !== val;
    });
    resetData();
    setTimeout(() => {
      updateLatestSymbols(base, initDefault, filterArray);
      this.setState({ symbols: filterArray });
    }, 500);
  }
  render() {
    const {
      currencies,
      isLoaded,
    } = this.props;
    const currenciesOption = [
      {
        key: 'usd',
        value: 'USD',
        text: 'USD',
      },
      {
        key: 'cad',
        value: 'CAD',
        text: 'CAD',
      },
      {
        key: 'idr',
        value: 'IDR',
        text: 'IDR',
      },
      {
        key: 'gbp',
        value: 'GBP',
        text: 'GBP',
      },
      {
        key: 'chf',
        value: 'CHF',
        text: 'CHF',
      },
      {
        key: 'sgd',
        value: 'SGD',
        text: 'SGD',
      },
      {
        key: 'inr',
        value: 'INR',
        text: 'INR',
      },
      {
        key: 'myr',
        value: 'MYR',
        text: 'MYR',
      },
      {
        key: 'jpy',
        value: 'JPY',
        text: 'JPY',
      },
      {
        key: 'krw',
        value: 'KRW',
        text: 'KRW',
      },
    ];

    const filteredArray = currenciesOption.filter((x) => { 
      return (this.state.symbols).indexOf(x.value) < 0;
    });

    const renderButton = () => {
      if(this.state.isEnable) {
        return (
          <div style={styles.boxDropdown}>
            <Dropdown
              clearable
              fluid
              search
              selection
              options={filteredArray}
              placeholder='Select Currencies'
              onChange={(e, { value }) => {
                this.setState({ currentValue: value });
              }}
            />
            <Button content='Submit' primary onClick={() => this.onSubmitCurreny()} />
          </div>
        );
      }
      return (
        <Button fluid onClick={() => this.setState({ isEnable: true })} content='Add More Currencies' icon='add' labelPosition='left' />
      );
    };
    if (isLoaded === false) {
      return (
        <Dimmer active inverted>
          <Loader inverted content='Loading' />
        </Dimmer>
      );
    }
    return (
      <div>
        <Header as='h1' style={styles.headTitle} content='Foreign Exchange Currency App' textAlign='center' />
        <Grid celled container stackable>
          <Grid.Row columns={1}>
            <Grid.Column>
              <div style={styles.boxHeader}>
                <h2>
                  <em>USD - United State Dollars</em>
                </h2>
                <div style={styles.currencyTitle}>
                  <strong>USD</strong>
                  <strong>10.0000</strong>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
          {
            currencies.map(item => (
              <Grid.Row columns={1} key={item.rates}>
                <Grid.Column>
                  <Segment>
                    <Grid>
                      <Grid.Row columns={2}>
                        <Grid.Column width={14}>
                          <div>
                            <div style={styles.titleList}>
                              <h2>{item.rates} </h2>
                              <strong style={styles.titleItem}>{item.calculation}</strong>
                            </div>
                            <p>
                              <em><strong>{item.rates} - {item.title}</strong></em>
                            </p>
                            <p>
                              <em>1 USD = {item.rates} <strong>{item.value}</strong></em>
                            </p>
                          </div>
                        </Grid.Column>
                        <Grid.Column width={2}>
                          <div style={styles.styleActions}>
                            <Icon link name='close' size='large' onClick={() => this.deleteItem(item.rates)} />
                          </div>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            ))
          }
          <Grid.Row columns={1}>
            <Grid.Column>
              {renderButton()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

PageHomeComponent.propTypes = {
  updateLatestSymbols: PropTypes.func.isRequired,
  resetData: PropTypes.func.isRequired,
  currencies: PropTypes.array.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};

export default PageHomeComponent;
