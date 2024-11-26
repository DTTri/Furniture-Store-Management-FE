import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingProgress() {
  return (
    <div className='fixed inset-0 z-50 bg-slate-600 bg-opacity-50 flex items-center justify-center'>
        <CircularProgress size="3rem" style={ { color: '#10a2f1' } }/>
    </div>
  )
}
