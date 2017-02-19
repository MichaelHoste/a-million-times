import React from 'react'
import _     from 'lodash'
import Clock from './Clock';

class Clocks extends React.Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <div>
        { this.renderClocks() }
      </div>
    )
  }

  renderClocks() {
    const rows = _.range(12)

    return _.map(rows, (row) => {
      return (
        <div className="row" key={row}>
          { this.renderClocksRow(row) }
        </div>
      )
    })
  }

  renderClocksRow(row) {
    const cols = _.range(24)

    return _.map(cols, (col) => {
      return this.renderClock(row, col)
    })
  }

  renderClock(row, col) {
    return (
      <Clock key={`${row}-${col}`} />
    )
  }
}

module.exports = Clocks
