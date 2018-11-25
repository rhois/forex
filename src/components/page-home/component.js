import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  Icon,
  Grid,
  Segment,
  Button,
} from 'semantic-ui-react';
import { styles } from './styles';

export class PageHomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idCompany: 1,
    };
  }
  componentDidMount() {
    const {
        updateLatest,
    } = this.props;

    setTimeout(() => {
        updateLatest();
    }, 500);
  }
  render() {
    console.log(this.props);
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
                  <strong>10.000</strong>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Segment>
                <Grid>
                  <Grid.Row columns={2}>
                    <Grid.Column width={14}>
                      <div>
                        <div style={styles.titleList}>
                          <h2>IDR </h2>
                          <strong style={styles.titleItem}>144,104.50</strong>
                        </div>
                        <p>
                          <em><strong>IDR - Indonesian Rupiah</strong></em>
                        </p>
                        <p>
                          <em>1 USD = IDR 14,410.45</em>
                        </p>
                      </div>
                    </Grid.Column>
                    <Grid.Column width={2}>
                      <div style={styles.styleActions}>
                        <Icon link name='close' size='large' />
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Segment>
                <Grid>
                  <Grid.Row columns={2}>
                    <Grid.Column width={14}>
                      <div>
                        <div style={styles.titleList}>
                          <h2>EUR </h2>
                          <strong style={styles.titleItem}>8.5694</strong>
                        </div>
                        <p>
                          <em><strong>EUR - Euro</strong></em>
                        </p>
                        <p>
                          <em>1 USD = EUR 0.8569</em>
                        </p>
                      </div>
                    </Grid.Column>
                    <Grid.Column width={2}>
                      <div style={styles.styleActions}>
                        <Icon link name='close' size='large' />
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Segment>
                <Grid>
                  <Grid.Row columns={2}>
                    <Grid.Column width={14}>
                      <div>
                        <div style={styles.titleList}>
                          <h2>GBP </h2>
                          <strong style={styles.titleItem}>7.5894</strong>
                        </div>
                        <p>
                          <em><strong>GBP - British Pound</strong></em>
                        </p>
                        <p>
                          <em>1 USD = GBP 0.7589</em>
                        </p>
                      </div>
                    </Grid.Column>
                    <Grid.Column width={2}>
                      <div style={styles.styleActions}>
                        <Icon link name='close' size='large' />
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Segment>
                <Grid>
                  <Grid.Row columns={2}>
                    <Grid.Column width={14}>
                      <div>
                        <div style={styles.titleList}>
                          <h2>SGD </h2>
                          <strong style={styles.titleItem}>13.6637</strong>
                        </div>
                        <p>
                          <em><strong>SGD - Singapore Dollar</strong></em>
                        </p>
                        <p>
                          <em>1 USD = SGD 1.3664</em>
                        </p>
                      </div>
                    </Grid.Column>
                    <Grid.Column width={2}>
                      <div style={styles.styleActions}>
                        <Icon link name='close' size='large' />
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column>
              <div>
                <Button fluid content='Add More Currencies' icon='add' labelPosition='left' />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

PageHomeComponent.propTypes = {
    updateLatest: PropTypes.func.isRequired,
};

export default PageHomeComponent;
