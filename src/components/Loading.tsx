import React from 'react'
import CSS from 'csstype';
import ReactLoading from 'react-loading';

const loadingPage: CSS.Properties = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#05050c"
  };

export const Loading = ()  => {
  return (
    <div className="loading-page" style={loadingPage}>
        <ReactLoading type={"spinningBubbles"} color={"#6c3483"} height={200} width={100} />
    </div>
  )
}
