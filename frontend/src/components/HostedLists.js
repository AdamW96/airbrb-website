import React from 'react'
import { Grid, Typography, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({}))

export default function HostedList (props) {
  const { lists } = props
  const styles = useStyles()

  return (
    <React.Fragment>
      {lists.length === 0 && <Typography>No authority or no data</Typography>}
      {lists.length !== 0 && (
        <Grid container>
          {lists.map((ele, index) => {
            return (
              <Grid item key={ele.id} className={styles.item}>
                {ele.id}
              </Grid>
            )
          })}
        </Grid>
      )}
    </React.Fragment>
  )
}

HostedList.propTypes = {
  lists: PropTypes.any,
}
