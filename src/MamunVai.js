import { Menu } from "@mui/icons-material/";
import { Slider } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./mamunVai.css";
import * as d3 from "d3";

const Container = styled.div`
  position: absolute;
  background: rgb(255, 255, 255);
  color: rgb(49, 51, 63);
  inset: 0px;
  overflow: hidden;
`;
const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  -webkit-box-pack: start;
  place-content: flex-start;
  -webkit-box-align: stretch;
  align-items: stretch;
  position: absolute;
  inset: 0px;
  overflow: hidden;
`;
const App = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
  width: 100%;
  overflow: auto;
  -webkit-box-align: center;
  align-items: center;
`;
const AppSidebar = styled.div`
  background-color: rgb(240, 242, 246);
  background-attachment: fixed;
  flex-shrink: 0;
  overflow: auto;
  padding: 6rem 1rem;
  position: relative;
  transition: margin-left 300ms ease 0s, box-shadow 300ms ease 0s;
  flex: 1;
  z-index: 100;
  margin-left: 0px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 21rem;
`;
const Header = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 0px;
  z-index: 1000020;
  display: block;
`;
const HeaderDecoration = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  left: 0px;
  height: 0.125rem;
  background-image: linear-gradient(
    90deg,
    rgb(255, 75, 75),
    rgb(255, 253, 128)
  );
  z-index: 1000020;
`;
const HeaderToolbar = styled.div`
  position: absolute;
  top: 0px;
  right: 1rem;
  height: 3.5rem;
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
`;

const AppWrapper = styled.div`
  overflow: visible;
  padding: 6rem 1rem 10rem;
  flex: 1 1 0%;
`;

const EventName = styled.h3`
  font-weight: 600;
  color: rgb(49, 51, 63);
  letter-spacing: -0.005em;
  padding: 0.5rem 0px 1rem;
  margin: 0px;
  line-height: 1.4;
  font-size: 1.75rem;
`;
const EventDetails = styled.div`
  display: flex;
  flex-direction: column;
`;
const EventItem = styled.span`
  margin: 10px 0px;
`;
const ItemTitleh2 = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: rgb(49, 51, 63);
  letter-spacing: -0.005em;
  margin: 0px;
  line-height: 1.4;
`;
const ItemTitleh4 = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  color: rgb(49, 51, 63);
  letter-spacing: -0.005em;
  margin: 0px;
  line-height: 1.4;
`;
const ItemLabel = styled.span`
  font-size: 14px;
`;
const Select = styled.select`
  padding: 15px;
  border: none;
  border-radius: 4px;
  background-color: white;
`;
const Option = styled.option``;
const Input = styled.input`
  padding: 15px;
  border: none;
  border-radius: 4px;
  background-color: white;
`;
const Title = styled.h1`
  font-weight: 700;
  color: rgb(49, 51, 63);
  padding: 1.25rem 0px 1rem;
  margin: 0px;
  line-height: 1.4;
  font-size: 2.75rem;
`;
const Checkbox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MamunVai = () => {
  const data = [
    {
      eventName: "GW150914",
      GPS: 1127868900.4,
      Mass1: 18.2,
      Mass2: 13.6,
      NetworkSNR: 14,
      EventPage: "https://gw-osc.org/eventapi/html/event/GW150914",
    },
    {
      eventName: "GW150913",
      GPS: 1128678600.4,
      Mass1: 23.2,
      Mass2: 18.6,
      NetworkSNR: 13,
      EventPage: "https://gw-osc.org/eventapi/html/event/GW150913",
    },
    {
      eventName: "GW150912",
      GPS: 1786678900.4,
      Mass1: 25.2,
      Mass2: 15.6,
      NetworkSNR: 12,
      EventPage: "https://gw-osc.org/eventapi/html/event/GW150912",
    },
    {
      eventName: "GW150911",
      GPS: 1128678978.6,
      Mass1: 33.2,
      Mass2: 11.6,
      NetworkSNR: 11,
      EventPage: "https://gw-osc.org/eventapi/html/event/GW150911",
    },
    {
      eventName: "GW150910",
      GPS: 1128678786.8,
      Mass1: 21.2,
      Mass2: 17.6,
      NetworkSNR: 10,
      EventPage: "https://gw-osc.org/eventapi/html/event/GW150910",
    },
  ];

  const [sliderValue, setSliderValue] = useState(null);

  // copy-pasted graph
  const graph = () => {
    const margin = { top: 30, right: 30, bottom: 30, left: 50 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
      .select("#mygraph")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // get the data
    d3.csv(
      "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/1_OneNum.csv"
    ).then(function (data) {
      // add the x Axis
      const x = d3.scaleLinear().domain([0, 1000]).range([0, width]);
      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

      // add the y Axis
      const y = d3.scaleLinear().range([height, 0]).domain([0, 0.01]);
      svg.append("g").call(d3.axisLeft(y));

      // Compute kernel density estimation
      let kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40));
      let density = kde(
        data.map(function (d) {
          return d.price;
        })
      );

      // Plot the area
      const curve = svg
        .append("g")
        .append("path")
        .attr("class", "mypath")
        .datum(density)
        .attr("fill", "#69b3a2")
        .attr("opacity", ".8")
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .attr("stroke-linejoin", "round")
        .attr(
          "d",
          d3
            .line()
            .curve(d3.curveBasis)
            .x(function (d) {
              return x(d[0]);
            })
            .y(function (d) {
              return y(d[1]);
            })
        );

      // A function that update the chart when slider is moved?
      function updateChart(binNumber) {
        // recompute density estimation
        kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(binNumber));
        density = kde(
          data.map(function (d) {
            return d.price;
          })
        );

        // update the chart
        curve
          .datum(density)
          .transition()
          .duration(1000)
          .attr(
            "d",
            d3
              .line()
              .curve(d3.curveBasis)
              .x(function (d) {
                return x(d[0]);
              })
              .y(function (d) {
                return y(d[1]);
              })
          );
      }

      // Listen to the slider?
      // d3.select("#mySlider").on("change", function(d){
      //   selectedValue = this.value
      //   updateChart(selectedValue)
      // })
    });

    // Function to compute density
    function kernelDensityEstimator(kernel, X) {
      return function (V) {
        return X.map(function (x) {
          return [
            x,
            d3.mean(V, function (v) {
              return kernel(x - v);
            }),
          ];
        });
      };
    }
    function kernelEpanechnikov(k) {
      return function (v) {
        return Math.abs((v /= k)) <= 1 ? (0.75 * (1 - v * v)) / k : 0;
      };
    }
  };

  const BarChart = () => {
    const [data, setData] = useState(null);
    const [hoveredValue, setHoveredValue] = useState(null);

    const width = 860;
    const height = 400;
    const margin = { top: 20, right: 200, bottom: 65, left: 90 };
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    useEffect(() => {
      // for extracting population string data to number
      const row = (d) => {
        d.population = +d.population;
        return d;
      };
      d3.csv(
        "https://gist.githubusercontent.com/Ovi246/8b261baf4b9cd8021cd097485a6309f4/raw/1756c0c4f3e7c0dbb420d517bb7911b8149ba008/religionByCountryTop20.csv",
        row
      ).then((data) => setData(data));
    }, []);

    if (!data) {
      return <h3>Loading</h3>;
    }

    // defining values according to data
    const yValue = (d) => d.country;
    const xValue = (d) => d.population;

    const colorValue = (d) => d.religion;

    const filteredData = data.filter((d) => hoveredValue === colorValue(d));
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, xValue)])
      .range([0, innerWidth]);

    const colorScale = d3
      .scaleOrdinal()
      .domain(data.map(colorValue))
      .range([
        "#1f76b4",
        "#ff7e0e",
        "#2ca02c",
        "#d62727",
        "#9467bd",
        "#8c564b",
        "#e377c2",
        "#7f7f7f",
      ]);

    // defining format for population huge number
    const siFormat = d3.format(".2s");
    const xAxisTickFormat = (tickValue) =>
      siFormat(tickValue).replace("G", "B");

    const yScale = d3
      .scaleBand()
      .domain(data.map(yValue))
      .range([innerHeight, 0])
      .paddingInner(0.15);

    return (
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {xScale.ticks().map((tickValue, i) => (
            <g
              className="tick"
              key={i}
              transform={`translate(${xScale(tickValue)},0)`}
            >
              <line y2={innerHeight} />
              <text
                style={{ textAnchor: "middle" }}
                y={innerHeight + 3}
                dy=".71em"
              >
                {xAxisTickFormat(tickValue)}
              </text>
            </g>
          ))}
          {yScale.domain().map((domainValue, i) => (
            <g className="tick">
              <text
                key={i}
                style={{ textAnchor: "end" }}
                x={-3}
                y={yScale(domainValue) + yScale.bandwidth() / 2}
                dy=".32em"
              >
                {domainValue}
              </text>
            </g>
          ))}
          <text
            className="axis-label"
            x={innerWidth / 2}
            y={innerHeight + 50}
            textAnchor="middle"
          >
            Population
          </text>
          <g transform={`translate(${innerWidth + 60},60)`}>
            <text x={25} y={-15} textAnchor="middle">
              Religion
            </text>
            {colorScale.domain().map((domainValue, i) => (
              <g transform={`translate(0,${i * 20})`}>
                <rect
                  width={25}
                  height={25}
                  fill={colorScale(domainValue)}
                  onMouseEnter={() => setHoveredValue(domainValue)}
                  onMouseOut={() => setHoveredValue(null)}
                />
                <text x={30} dy=".9em">
                  {domainValue}
                </text>
              </g>
            ))}
          </g>
          <g opacity={hoveredValue ? 0.2 : 1}>
            {data.map((d, i) => {
              return (
                <rect
                  className="mark"
                  key={i}
                  x={0}
                  y={yScale(yValue(d))}
                  width={xScale(xValue(d))}
                  height={yScale.bandwidth()}
                  fill={colorScale(colorValue(d))}
                >
                  <title>{xAxisTickFormat(xValue(d))}</title>
                </rect>
              );
            })}
          </g>
          {filteredData.map((d, i) => {
            return (
              <rect
                className="mark"
                key={i}
                x={0}
                y={yScale(yValue(d))}
                width={xScale(xValue(d))}
                height={yScale.bandwidth()}
                fill={colorScale(colorValue(d))}
              >
                <title>{xAxisTickFormat(xValue(d))}</title>
              </rect>
            );
          })}
        </g>
      </svg>
    );
  };

  useEffect(() => {
    graph();
  }, []);

  const [filteredList, setFilteredList] = useState([]);
  const [selectedName, setSelectedName] = useState(data[0].eventName);
  const [selectedOption, setSelectedOption] = useState("");
  const [range, setRange] = useState([30, 400]);

  useEffect(() => {
    var filteredData = getFilteredEvent(selectedName);

    setFilteredList(filteredData);
  }, [selectedName]);

  // const handleFilterChange = (e) => {
  //   e.persist();
  //   let { name, value } = e.target;
  //   setFilterData({ ...filterData, [name]: value });
  // };

  const handleEventChange = (event) => {
    setSelectedName(event.target.value);
  };
  const handleOption = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleSliderChange = (event, newValue) => {
    setRange(newValue);
    setSliderValue(event.target.value);
  };
  const getFilteredEvent = (eventName) => {
    let updatedEvents = data.filter((item) => {
      return item.eventName === eventName;
    });
    return updatedEvents;
  };

  return (
    <Container>
      <Header>
        <HeaderDecoration></HeaderDecoration>
        <HeaderToolbar>
          <Menu />
        </HeaderToolbar>
      </Header>
      <AppContainer>
        <AppSidebar>
          <ItemTitleh2>Select Data Time and Detector</ItemTitleh2>
          <ItemLabel>How do you want to find data? </ItemLabel>
          <Select name="option" onChange={handleOption}>
            <Option value="0" selected>
              By Event Name
            </Option>
            <Option value="1">By GPS</Option>
          </Select>
          {selectedOption === "1" ? (
            <>
              <ItemLabel>GPS Time</ItemLabel>
              <Input />
              <ItemLabel>Example times in the H1 detector:</ItemLabel>
              <li>1126259462.4 (GW150914)</li>
              <li>1187008882.4 (GW170817)</li>
              <li>1128667463.0 (hardware injection)</li>
              <li>1132401286.33 (Koi Fish Glitch)</li>
            </>
          ) : (
            <>
              <ItemLabel>Select Event? </ItemLabel>
              <Select
                name="eventName"
                value={selectedName}
                onChange={handleEventChange}
              >
                {data &&
                  data.map((item, idx) => {
                    return (
                      <option value={item.eventName} key={idx}>
                        {item.eventName}
                      </option>
                    );
                  })}
              </Select>
            </>
          )}
          <ItemLabel>Detector</ItemLabel>
          <Select>
            <Option>H1</Option>
            <Option>L1</Option>
          </Select>
          <Checkbox>
            <input type="checkbox" />
            <span style={{ marginLeft: "5px" }}>Full Sample Rate Data</span>
          </Checkbox>
          <ItemTitleh2>Set Plot Parameters</ItemTitleh2>
          <ItemLabel>Time Range (seconds) </ItemLabel>
          <Slider
            size="small"
            aria-label="Always visible"
            defaultValue={parseFloat(1.0)}
            min={parseFloat(0.1)}
            max={parseFloat(8.0)}
            step={parseFloat(0.1)}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
          />
          <ItemTitleh4>Whitened and band-passed data</ItemTitleh4>
          <Checkbox>
            <input type="checkbox" />
            <span style={{ marginLeft: "5px" }}>Whiten</span>
          </Checkbox>
          <ItemLabel>Band-pass frequency range (Hz)</ItemLabel>
          <Slider
            size="small"
            aria-label="Always visible"
            min={10}
            max={2000}
            marks={[
              { label: "10", value: 10 },
              { label: "2000", value: 2000 },
            ]}
            value={range}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
          />
          <ItemTitleh4>Q-transform plot</ItemTitleh4>
          <ItemLabel>Colorbar Max Energy</ItemLabel>
          <Slider
            size="small"
            aria-label="Always visible"
            defaultValue={25}
            min={10}
            max={500}
            step={1}
            marks={[
              { label: "10", value: 10 },
              { label: "500", value: 500 },
            ]}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
          />
          <ItemLabel>Q-Value</ItemLabel>
          <Slider
            size="small"
            aria-label="Always visible"
            defaultValue={10}
            min={5}
            max={120}
            step={1}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
          />
        </AppSidebar>
        <App>
          <AppWrapper>
            <Title>Gravitational Wave Quickview</Title>

            <li>Use the menu at left to select data and set plot parameters</li>
            <li>Your plots will appear below</li>

            {filteredList.map((item, idx) => (
              <div key={idx}>
                <EventName>{item.eventName}</EventName>
                <EventDetails>
                  <EventItem>
                    GPS:{" "}
                    <div style={{ color: "rgb(9, 171, 59)" }}>{item.GPS}</div>
                  </EventItem>
                  <EventItem>
                    Mass 1:{" "}
                    <div style={{ color: "rgb(9, 171, 59)" }}>{item.Mass1}</div>
                  </EventItem>
                  <EventItem>
                    Mass 2:{" "}
                    <div style={{ color: "rgb(9, 171, 59)" }}>{item.Mass2}</div>
                  </EventItem>
                  <EventItem>
                    Network SNR:{" "}
                    <div style={{ color: "rgb(9, 171, 59)" }}>
                      {item.NetworkSNR}
                    </div>
                  </EventItem>
                  <EventItem>
                    Event Page:{" "}
                    <div style={{ color: "rgb(9, 171, 59)" }}>
                      {item.EventPage}
                    </div>
                  </EventItem>
                </EventDetails>
              </div>
            ))}

            <h2>Raw Data</h2>
            <div id="mygraph"></div>
            <h2>Whitened and Band-passed Data</h2>
            <BarChart />
          </AppWrapper>
        </App>
      </AppContainer>
    </Container>
  );
};

export default MamunVai;
