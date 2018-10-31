export const IDGenerator = () => {    
  const _getRandomInt = ( min, max ) => {
    return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
  }
  
  const timestamp = +new Date();
  const length = 8;
  const ts = timestamp.toString();
  const parts = ts.split( "" ).reverse();
  let id = "";
  
  for( let i = 0; i < length; ++i ) {
    const index = _getRandomInt( 0, parts.length - 1 );
    id += parts[index];
  }
  return id;
}