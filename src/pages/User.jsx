import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Addpages.css";


import React from "react";


import JoditEditor from "jodit-react";

import { AiOutlineEye, AiOutlinePlusCircle } from "react-icons/ai";

import parse from "html-react-parser";



const Dashboard = () => {
  const [content, setContent] = useState("");

  const [validation] = useState(false);

  const [resultMsg, setResultMsg] = useState("");

  const [usersList, setUsersList] = useState([]);

  const [subtitleList, setSubtitleList] = useState([]);

  const [addSubtitle, setAddSubTitle] = useState(false);

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
  const [data2, setData2] = useState({
    subtitle: "",
    content: "",
  });

  // const addSubtitle=(e)=>{

  //     const userDetailsObj2 = {

  //       subtitles:[{

  //           subtitlename:  data.subtitle,
  //           content: data.content

  //       }]

  //     }

  //     console.log(e,userDetailsObj2,"today i,m object2")

  //   }

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleChange2 = (e) => {
    setData2({
      ...data2,
      [e.target.name]: e.target.value,
    });
  };
  console.log(data2,"2data i'm data2")

  const contentValue = (enteredContent) => {
    if (enteredContent.length !== 0) {
      setData({
        ...data,
        content: enteredContent,
      });
    }
  };

  //    console.log(data, "iam dataaaaaaaaaaaaaaaaaaaaaaaaaaa")

  //    console.log(usersList,"i kknjkjksnfajknsjkdgggggggggggggggggggggggggggggggggggggggggggggggggg userlist")

  console.log(addSubtitle);

  function subtitleAdded(event) {
    event.stopPropagation();

    console.log(data.subtitle, "data.subititle");

    setSubtitleList([...subtitleList, data.subtitle]);

    setData({
      ...data,
      subtitle: "",
    });
  }

  console.log(subtitleList, "iam subtitlteList");

  const handlesubmit = (e) => {
    e.preventDefault();

    console.log("form submitted successfullly");

    const userDetailsObj = {
      id: data.id,
      title: data.title,
      subtitles: [
        {
          subtitlename: data.subtitle,
          content: data.content,
        },
      ],
    };

    setarr([...arr, userDetailsObj]);

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

  console.log(usersList, "iam uderslist");

  const handleedit = (e) => {
    e.preventDefault();

    const userDetailsObj = {
      id: data.id,
      title: data.title,
      subtitles: [
        {
          subtitlename: data.subtitle,
          content: data.content,
        },
      ],
    };
    window.alert("Data edited successfully");

    setarr([...arr, userDetailsObj]);

    /*>>>>>>>>>>>>>>>>>>>>>>>   API CALL TO ADD CONTENT  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/

    async function updateAPICALL() {
      const response = await fetch("http://localhost:9000/updatecontent/:id", {
        method: "put",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userDetailsObj),
      });

      const result = await response.json();

      setResultMsg(result?.message);
      console.log(result, "backend edit response");
    }

    updateAPICALL();

    // .then(response => response.json())
    // .then(result => console.log(result, "backemnd post response"))
    // .catch(error => console.log('error', error));
  };

  let newContentsList = [];
  
    usersList &&
    usersList?.map((each) =>
      each.subtitle?.map((item) => {
        newContentsList.push(item.content);
      })
    );

  // console.log(newContentsList, "newContentsListlkvmmmmmmmmmmmmmmmmmmmskdnvlksdgggggg")

  // const htmlFromCMS = newContentsList;
  // console.log(htmlFromCMS,"i am cms .........................")

  // const preview = (e) => {
  //   window.alert(htmlFromCMS, "data");
  //   const a = parse(htmlFromCMS);

  //   console.log(a, " i am parse data");
  // };

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

                  <div className="col-lg-12">
                    <div className="form-group">
                      <div className="flex flex-row justify-between align-items-center mr-3">
                        <label class="flex">Sub Title </label>
                        <span class="">
                          <button
                            type="button"
                            onClick={() => {
                              setAddSubTitle(true);
                            }}
                          >
                            {<AiOutlinePlusCircle />}
                          </button>
                        </span>
                      </div>
                      <input
                        value={data.subtitle}
                        name="subtitle"
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>

                  {/* <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Content</label>
                                            <input value={data.content} name="content" onChange={handleChange} className="form-control"></input>
                                        </div>
                                     </div> */}

                  <br />
                  <br />
                  <br />

                  {/* <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Section</label>
                                            <input value={data.section} name="section" onChange={handleChange} className="form-control"></input>
                                        </div>
                                     </div> */}

                  <div>
                    <div className="App">
                      <label>Content</label>

                      <div>
                        <JoditEditor
                          class="text-start content-start h-[100vh]"
                          onChange={(event) => {
                            console.log(event, "iam event");

                            contentValue(event);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {addSubtitle ? (
                    <>
                      <div className="col-lg-12">
                        <div className="form-group">
                          <div className="flex flex-row justify-between align-items-center mr-3">
                            <label class="flex">Sub Title </label>
                            <span class="">
                              <button
                                type="button"
                                onClick={() => {
                                  setAddSubTitle(true);
                                }}
                              >
                                {<AiOutlinePlusCircle />}
                              </button>
                            </span>
                          </div>
                          <input
                            value={data.subtitle}
                            name="subtitle2"
                            onChange={handleChange2}
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="App">
                          <label>Content</label>

                          <div>
                            <JoditEditor
                              class="text-start content-start h-[100vh]"
                              onChange={(event) => {
                                console.log(event, "iam event");

                                contentValue(event);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}

                  <div className="col-lg-12 my-2">
                    <div className="form-group">
                      <button
                        className="btn bg-green-500 w-30 mx-5"
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

                {/* <button class="bg-red-400 w-16 rounded-full text-white" onClicl={handleedit}> Edit</button>
                                <button class="bg-red-600 w-16 rounded-full text-white">Delete</button> */}

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
      </div>
      <div className=" text-center justify-center ">
        <div>
          <div class="mt-[6%] ">
            <div class="border-2 border-green-400  ">{parse(content)}</div>
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
      <div />
    </div>
  );
};

export default Dashboard;