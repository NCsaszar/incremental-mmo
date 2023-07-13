export const gradientBackground =
  'radial-gradient(circle, rgba(187,187,187,1) 35%, rgba(11,251,241,1) 100%, rgba(69,89,93,1) 100%)';

export const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '200px',
  minHeight: '200px',
  padding: '5px',
  margin: '10px',
  borderRadius: '25px',
  boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.8)', // Box shadow to create the pop-out effect
  transform: 'translateY(-6px)', // Translation to make the card appear lifted
};

export const sellbtnstyle = {
  bgcolor: 'red',
  color: 'white',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
    bgcolor: 'red',
  },
};

export const allbtnstyle = {
  bgcolor: 'green',
  color: 'white',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
    bgcolor: 'green',
  },
};
