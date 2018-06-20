export default function (Component, ...stors$) {
  return componentFromStream(props$ => {
    return combineLatest(
      props$,
      ...stors$.map(store => store.flow$)
    ).pipe(
      map(([props, ...stors]) => <Component 
        {...stors$.map((store, i) => {[store.name]: stors[i], ...store.actions}).reduce((acc, curr) => ({...curr, ...acc}), {}} 
        {...props} 
      />)
    )
  })
}
