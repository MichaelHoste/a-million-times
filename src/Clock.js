import React  from 'react'
import moment from 'moment'
import _      from 'lodash'

class Clock extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      hoursAngle:   this.randBetween(0, 359),
      minutesAngle: this.randBetween(0, 359),
    }
  }

  componentDidMount() {
    setTimeout(this.initializeInterval.bind(this), Math.floor(Math.random() * 2500))
  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillUnmount() {

  }

  initializeInterval() {
    this.setState({
      hoursAngle:   this.randBetween(0, 359),
      minutesAngle: this.randBetween(0, 359)
    })

    setInterval( () => {
      this.setState({
        hoursAngle:   this.randBetween(0, 359),
        minutesAngle: this.randBetween(0, 359)
      })
    }, 2500)
  }

  randBetween(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  staticStyle(angle) {
    return {
      'transform':        `rotate(${angle}deg)`,
      'MozTransition':    "inherit",
      'WebkitTransition': "inherit",
      'OTransition':      "inherit",
      'transition':       "inherit"
    }
  }

  render() {
    return (
      <div className="clock">
        <div className="inside-clock">
          { this.renderHoursHand() }
          { this.renderMinutesHand() }
        </div>
      </div>
    )
  }

  renderHoursHand() {
    let style = { 'transform': `rotate(${this.state.hoursAngle}deg)`}

    return (
      <div className="hand hand-hours" style={style}>
      </div>
    )
  }

  renderMinutesHand() {
    let style = { 'transform': `rotate(${this.state.minutesAngle}deg)`}

    return (
      <div className="hand hand-minutes" style={style}>
      </div>
    )
  }
}

module.exports = Clock
