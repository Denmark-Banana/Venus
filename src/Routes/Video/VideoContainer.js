import React from "react";
import VideoPresenter from "./VideoPresenter";
import { moviesApi, tvApi } from "api";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/")
    };
  }

  async componentDidMount() {
    console.log("VideoContainer ComponentDidMount");
    //Initialize Variables
    const {
      match: {
        params: { id }
      },
      history: { push },
    } = this.props;

    //Initialize Settings to need for playing YouTube
    const { isMovie } = this.state;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.videos(parsedId));
      } else {
        ({ data: result } = await tvApi.videos(parsedId));
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({
        result
      });
    }
  }

  render() {
    const { result } = this.state;
    return <VideoPresenter result={result} />;
  }
}
