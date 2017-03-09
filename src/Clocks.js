import React  from 'react'
import _      from 'lodash'
import moment from 'moment'
import Clock  from './Clock';

class Clocks extends React.Component {

  constructor(props) {
    super(props)

    this.decimalGrids = this.initializeDecimalGrids()

    this.state = {
      grid: this.initializeGrid(),
    }
  }

  componentDidMount() {
    let display = () => {
      for(let i=0;i<5; i++) {
        setTimeout(this.DisplayCurrentHour.bind(this, 4-i), 2000+i*600)
      }

      for(let i=0;i<24; i++) {
        setTimeout(this.DisplayRandom.bind(this, 23-i), 9500+i*150)
      }
    }

    display()
    setInterval( () => { display() }, 15500)
  }

  initializeGrid() {
    // array of 12 rows and 24 cols
    let grid = new Array(12)

    _.each(grid, (row, i) => {
      grid[i] = new Array(24)

      _.each(grid[i], (col, j) => {
        grid[i][j] = ' '
      })
    })

    return grid
  }

  initializeDecimalGrids() {
    const _0 = this.stringsToGrid(["┌───┐",
                                   "│┌─┐│",
                                   "││─││",
                                   "││─││",
                                   "│└─┘│",
                                   "└───┘"])

    const _1 = this.stringsToGrid(["┌──┐─",
                                   "└─┐│─",
                                   "──││─",
                                   "──││─",
                                   "┌─┘└┐",
                                   "└───┘"])

    const _2 = this.stringsToGrid(["┌───┐",
                                   "└──┐│",
                                   "┌──┘│",
                                   "│┌──┘",
                                   "│└──┐",
                                   "└───┘"])

    const _3 = this.stringsToGrid(["┌───┐",
                                   "└──┐│",
                                   "┌──┘│",
                                   "└──┐│",
                                   "┌──┘│",
                                   "└───┘"])

    const _4 = this.stringsToGrid(["┌┐─┌┐",
                                   "││─││",
                                   "│└─┘│",
                                   "└──┐│",
                                   "───││",
                                   "───└┘"])

    const _5 = this.stringsToGrid(["┌───┐",
                                   "│┌──┘",
                                   "│└──┐",
                                   "└──┐│",
                                   "┌──┘│",
                                   "└───┘"])

    const _6 = this.stringsToGrid(["┌───┐",
                                   "│┌──┘",
                                   "│└──┐",
                                   "│┌─┐│",
                                   "│└─┘│",
                                   "└───┘"])

    const _7 = this.stringsToGrid(["┌───┐",
                                   "└──┐│",
                                   "───││",
                                   "───││",
                                   "───││",
                                   "───└┘"])

    const _8 = this.stringsToGrid(["┌───┐",
                                   "│┌─┐│",
                                   "│└─┘│",
                                   "│┌─┐│",
                                   "│└─┘│",
                                   "└───┘"])

    const _9 = this.stringsToGrid(["┌───┐",
                                   "│┌─┐│",
                                   "│└─┘│",
                                   "└──┐│",
                                   "┌──┘│",
                                   "└───┘"])

    return [_0, _1, _2, _3, _4, _5, _6, _7, _8, _9]
  }

  stringsToGrid(strings) {
    // array of 6 rows and 5 cols
    let grid = new Array(strings.length)

    _.each(strings, (string, i) => {
      grid[i] = string.split('')
    })

    return grid
  }

  insertDecimalInGrid(grid, decimal, row, col) {
    _.each(this.decimalGrids[decimal], (decimalGridRow, i) => {
      _.each(decimalGridRow, (decimalGridValue, j) => {
        grid[row+i][col+j] = decimalGridValue
      })
    })

    return grid
  }

  // colToDisplay is the number (0 and 1 = first and second number, 3 = separator, 4 and 5 = second number)
  DisplayCurrentHour(colToDisplay = undefined) {
    let grid = this.state.grid

    let hours   = moment().format('HH')
    let minutes = moment().format('mm')

    _.each(grid, (row, i) => {
      _.each(grid[i], (col, j) => {
        if(    (colToDisplay == 0 && j <  6           )
            || (colToDisplay == 1 && j >= 6  && j < 11)
            || (colToDisplay == 2 && j >= 11 && j < 13)
            || (colToDisplay == 3 && j >= 13 && j < 18)
            || (colToDisplay == 4 && j >= 18          ) ) {
          grid[i][j] = '─'
        }
      })
    })

    if (colToDisplay == undefined || colToDisplay == 0) {
      grid = this.insertDecimalInGrid(grid, parseInt(hours.split('')[0]),   3, 1)
    }

    if (colToDisplay == undefined || colToDisplay == 1) {
      grid = this.insertDecimalInGrid(grid, parseInt(hours.split('')[1]),   3, 6)
    }

    if(colToDisplay == undefined || colToDisplay == 2) {
      grid[6][11] = grid[4][11] = '┌'
      grid[6][12] = grid[4][12] = '┐'
      grid[7][11] = grid[5][11] = '└'
      grid[7][12] = grid[5][12] = '┘'
    }

    if (colToDisplay == undefined || colToDisplay == 3) {
      grid = this.insertDecimalInGrid(grid, parseInt(minutes.split('')[0]), 3, 13)
    }

    if (colToDisplay == undefined || colToDisplay == 4) {
      grid = this.insertDecimalInGrid(grid, parseInt(minutes.split('')[1]), 3, 18)
    }

    this.setState({ grid: grid })
  }

  DisplayRandom(colToRandomize = undefined) {
    let grid = this.state.grid

    _.each(grid, (row, i) => {
      _.each(grid[i], (col, j) => {
        if(colToRandomize == undefined || colToRandomize == j) {
          grid[i][j] = ' '
        }
      })
    })

    this.setState({ grid: grid })
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
      <Clock key={`${row}-${col}`}
             position={this.state.grid[row][col]} />
    )
  }
}

module.exports = Clocks
