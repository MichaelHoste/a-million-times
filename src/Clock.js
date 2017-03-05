import React  from 'react'
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
    this.updateClockPosition(this.props.position)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.position != nextProps.position) {
      clearInterval(this.randomInterval)

      this.updateClockPosition(nextProps.position)
    }
  }

  componentWillUnmount() {

  }

  initializeInterval() {
    this.setState({
      hoursAngle:   this.randBetween(0, 359),
      minutesAngle: this.randBetween(0, 359)
    })

    this.randomInterval = setInterval(() => {
      this.setState({
        hoursAngle:   this.randBetween(0, 359),
        minutesAngle: this.randBetween(0, 359)
      })
    }, 2500)
  }

  randBetween(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  updateClockPosition(position) {
    if(position == ' ') { // random
      setTimeout(this.initializeInterval.bind(this), Math.floor(Math.random() * 2500))
    }
    else if(_.includes('┌┐└┘│─', position)) { // corner + vertical/horizontal
      let hoursAngle   = 0
      let minutesAngle = 90

      if(position == '─') {
        hoursAngle   = 0
        minutesAngle = 180
      }
      else if(position == '│') {
        hoursAngle   = 90
        minutesAngle = 270
      }
      else if(position == '┐') {
        hoursAngle   = 90
        minutesAngle = 180
      }
      else if(position == '┘') {
        hoursAngle   = 180
        minutesAngle = 270
      }
      else if(position == '└') {
        hoursAngle   = 270
        minutesAngle = 0
      }
      else if(position == '┌') {
        hoursAngle   = 0
        minutesAngle = 90
      }

      this.setState({
        hoursAngle:   hoursAngle,
        minutesAngle: minutesAngle
      })
    }
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
