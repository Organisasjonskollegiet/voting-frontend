export const hightlightedStyle = {
  fontStyle: 'normal',
  fontSize: '16px',
  fontWeight: 'bold',
  lineHeight: '150%',
} as React.CSSProperties;

export const labelStyle = {
  ...hightlightedStyle,
  marginBottom: '10px',
} as React.CSSProperties;

export const boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';

export const containerStyle = {
  boxShadow,
  backgroundColor: 'white',
  padding: '40px 40px 16px',
  borderRadius: '4px',
  marginBottom: '16px',
} as React.CSSProperties;

export const collapsedStyle = {
  boxShadow,
  backgroundColor: 'white',
  padding: '16px 40px',
  borderRadius: '4px',
  cursor: 'pointer',
};

export const inputStyle = {
  background: '#fff',
  boxShadow: ' 0px 0px 10px rgba(0, 0, 0, 0.1)',
  border: 'none',
} as React.CSSProperties;

export const checkboxStyle = {
  boxShadow,
  width: '270px',
  height: '56px',
  padding: '16px',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: 'bold',
} as React.CSSProperties;

export const pointerStyle = {
  cursor: 'pointer',
} as React.CSSProperties;

export const h1Style = {
  fontSize: '1.5em',
};
