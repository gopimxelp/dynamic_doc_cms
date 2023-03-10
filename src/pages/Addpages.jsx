import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Addpages.css";

import React from "react";

import JoditEditor from "jodit-react";

import { AiOutlineEye, AiOutlinePlusCircle } from "react-icons/ai";

import parse from "html-react-parser";

const Addpages = () => {
  const [content, setContent] = useState("");

  const [counter, setCounter] = useState(null);

  const [validation] = useState(false);

  const [resultMsg, setResultMsg] = useState("");

  const [usersList, setUsersList] = useState([]);

  const [addSubtitle, setAddSubTitle] = useState(false);

  const [inputdisable, setInputDisable] = useState(false);

  const onSubmit = (items) => {
    setContent(items);
  };

  const [arr, setarr] = useState([]);
  const [data, setData] = useState({
    id: "",
    title: "",
    subtitle: "",
    content: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  console.log(data, "i amdata");

  const [finalArray, setFinalArray] = useState([]);

  const addSubtitleButtonClicked = (event) => {
    event.stopPropagation();

    setCounter(0);

    if (
      data &&
      data.subtitle.length > 0 &&
      (data.subtitle !== " " || data.subtitle !== "")
    ) {
      setInputDisable(true);
    }
  };

  const addContentButtonClicked = (event) => {
    event.stopPropagation();

    setAddSubTitle(false);

    setCounter(1);

    if (data && data.content.length > 0) {
      setInputDisable(false);

      setFinalArray([
        ...finalArray,
        {
          subtitlename: data.subtitle,
          content: data.content,
        },
      ]);

      setData({
        ...data,
        subtitle: "",
        content: "",
      });
    }

    if (counter == 1) {
      setData({
        ...data,
        subtitle: "",
        content: "",
      });
    }
  };
  console.log(finalArray, "i am final array");

  console.log(counter, "i am counter value");

  const handlesubmit = (e) => {
    e.preventDefault();

    console.log("form submitted successfullly");

    const userDetailsObj = {
      id: data.id,
      title: data.title,
      subtitles: finalArray,
    };

    setarr([...arr, userDetailsObj]);
    console.log(userDetailsObj, "object details");

    /*>>>>>>>>>>>>>>>>>>>>>>>   API CALL TO ADD CONTENT  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

    async function postAPICALL() {
      const response = await fetch("http://localhost:9000/add-content", {
        method: "post",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userDetailsObj),
      });

      const result = await response.json();

      setResultMsg(result?.message);
      console.log(result, "backend post response");
    }

    postAPICALL();

    // .then(response => response.json())
    // .then(result => console.log(result, "backemnd post response"))
    // .catch(error => console.log('error', error));
  };

  async function getAPICALL() {
    const response = await fetch(`http://localhost:9000/content`, {
      method: "get",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });

    const result = await response.json();

    setUsersList(result);

    console.log(result, "i am from get api call");
  }

  useEffect(() => {
    if (resultMsg === "User added successfully") {
      getAPICALL();
    } else {
      setResultMsg("");
    }
  }, [resultMsg]);

  useEffect(() => {
    getAPICALL();
  }, []);

  let newContentsList = [];

  usersList &&
    usersList?.map((each) =>
      each.subtitle?.map((item) => {
        newContentsList.push(item.content);
      })
    );

  return (
    <div>
      <div className="row my-5">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card mt-5" style={{ textAlign: "left" }}>
              <div className="card-title text-center mt-3">
                <h2>Documentation Creation</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>ID</label>
                      <input
                        value={data.id}
                        name="id"
                        onChange={handleChange}
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Title</label>
                      <input
                        name="title"
                        onChange={handleChange}
                        className="form-control"
                      ></input>
                      {data.title.length === 0 && validation && (
                        <span className="text-danger">Enter the name</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row   justify-around  mr-3">
                    <button
                      className="w-[60%] border-2 my-2 flex flex-row justify-center align-items-center bg-orange-300"
                      type="button"
                      onClick={() => {
                        setAddSubTitle(true);
                      }}
                    >
                      <label class="cursor-pointer">
                        Add Sub Title & Content
                      </label>
                      <span class="align-items-center pt-1">
                        <button>{<AiOutlinePlusCircle />}</button>
                      </span>
                    </button>
                  </div>

                  {addSubtitle ? (
                    <>
                      <div
                        className="col-lg-12"
                        disabled={inputdisable === true}
                      >
                        <div className="form-group">
                          <div className="flex flex-row justify-between align-items-center mr-3">
                            <label class="flex">Sub Title </label>
                          </div>
                          <input
                            disabled={inputdisable === true}
                            value={data.subtitle}
                            name="subtitle"
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <br />
                      <br />
                      <button
                        class="flex flex-start bg-orange-400 w-40 h-8 text-center rounded my-2"
                        type="button"
                        onChange={handleChange}
                        onClick={addSubtitleButtonClicked}
                      >
                        Add Subtitle
                      </button>
                      <br />
                      <br />

                      <div>
                        <div className="App">
                          <label>Content</label>

                          <div>
                            <JoditEditor
                              disabled={true}
                              setReadonly={true}
                              class="text-start content-start h-[100vh]"
                              value={data.content}
                              onChange={(event) => {
                                console.log(event, "iam event");

                                setData({
                                  ...data,
                                  content: event,
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <br />
                      <br />
                      <button
                        class="flex flex-center bg-orange-400 w-40 h-8 text-center  rounded my-2"
                        type="button"
                        onClick={addContentButtonClicked}
                      >
                        Add Content
                      </button>
                    </>
                  ) : null}

                  <div className="flex flex-row justify-around col-lg-12 my-2">
                    <div className="form-group justify-items-center sm:mt-2">
                      <button
                        className="btn btn-success bg-green-500 w-36 ml-12"
                        type="submit"
                        onClick={() => setAddSubTitle(false)}
                      >
                        Add
                      </button>
                      <Link
                        to="/"
                        className="btn btn-danger w-30 mx-5"
                        onClick={() => setAddSubTitle(false)}
                      >
                        Back to Home
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div>
        <table class="table borderless">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Sub Title</th>
              <th>Preview</th>
            </tr>
          </thead>
          <tbody className="">
            {usersList?.map((item) => (
              <tr class="border-2x solid black">
                <td>
                  <div class="text-blue-400">
                    <p>{item.id}</p>
                  </div>
                </td>

                <td>
                  <div>
                    <p>{item.title}</p>
                  </div>
                </td>

                {item &&
                  item?.subtitle?.map((each) => (
                    <td class="flex flex-col">
                      <div>
                        <p>{each.subtitlename}</p>
                      </div>
                    </td>
                  ))}

                <td className=" ">
                  {item &&
                    item?.subtitle?.map((each) => (
                      <td
                        onClick={() => {
                          onSubmit(each.content);
                          window.history.replaceState(
                            null,
                            "new title",
                            `/${each.subtitlename}/${each._id}`
                          );
                        }}
                        class="flex  flex-col align-middle justify-center items-center mt-3"
                      >
                        {" "}
                        <div>
                          <AiOutlineEye className="" />
                        </div>
                      </td>
                    ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className=" text-center justify-center ">
          <div>
            <div class="mt-[6%] ">
              <div class=" border-green-400  ">
                {parse(content)}
                <Link
                  to="/addpages"
                  target="_parent"
                  className="btn btn-danger w-20 mx-5"
                >
                  Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div />
    </div>
  );
};

export default Addpages;
