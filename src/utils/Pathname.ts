function generatePathArray(pathname:string) {
    const segments = pathname.split('/');
    const pathArray = segments
      .filter((segment) => segment !== '') // Loại bỏ các segment rỗng
      .map((segment, index) => {
        return {
          title: segment,
        };
      });
  
    return pathArray;
  }
  export default generatePathArray;
  