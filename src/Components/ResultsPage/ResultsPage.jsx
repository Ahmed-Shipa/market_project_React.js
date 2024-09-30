// Results.js

import React from "react";

// Define custom column names
const customColumnNames = [
  "الزيت",   // Input 1
  "السكر",   // Input 2
  "مكرونة",  // Input 3
  "الشاى",   // Input 4
  "برسيل",   // Input 5
  "بريل",    // Input 6
  "ملح",     // Input 7
  "بسكويت",  // Input 8
  "صابون",   // Input 9
  "دقيق", // Input 10
];

const Results = ({
  results,
  showMore,
  onShowMore,
  doubledResults,
  showMoreForDoubled,
  onShowMoreForDoubled,
  tripledResults,
  showMoreForTripled,
  onShowMoreForTripled,
  quadrupledResults,
  showMoreForQuadrupled,
  onShowMoreForQuadrupled,
  customResults,
  showMoreForCustom,
  onShowMoreForCustom,
  sixthResults,
  showMoreForSixth,
  onShowMoreForSixth,
  seventhResults, // New prop
  showMoreForSeventh, // New prop
  onShowMoreForSeventh, // New prop
  eighthResults, // New prop
  showMoreForEighth, // New prop
  onShowMoreForEighth, // New prop
  onGoBack,
}) => {
  return (
    <div className="results-container">
      {/* First Table */}
      <h2>تفريدة 1 فرد (48-49)</h2>

      {results.length > 0 ? (
        <table className="results-table">
          <thead>
            <tr>
              <th>#</th>
              {customColumnNames.map((name, index) => (
                <th key={index}>{name}</th>
              ))}
              <th>المجموع</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {customColumnNames.map((name, colIndex) => (
                  <td key={colIndex}>{result[`input${colIndex + 1}`]}</td>
                ))}
                <td>{result.sum.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="alert alert-danger text-center">لا يوجد تفريده ل 1  فرد من هذة السلع </p>
      )}

      {showMore && (
        <button className="show-more-button" onClick={onShowMore}>
          المزيد
        </button>
      )}

      {/* Second Table */}
      <h2 className="mt-4">تفريدة 2 فرد (98-99)</h2>

      {doubledResults.length > 0 ? (
        <table className="results-table">
          <thead>
            <tr>
              <th>#</th>
              {customColumnNames.map((name, index) => (
                <th key={index}>{name}</th>
              ))}
              <th>المجموع</th>
            </tr>
          </thead>
          <tbody>
            {doubledResults.map((result, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {customColumnNames.map((name, colIndex) => (
                  <td key={colIndex}>{result[`input${colIndex + 1}`]}</td>
                ))}
                <td>{result.sum.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="alert alert-danger text-center">لا يوجد تفريده ل 2  فرد من هذة السلع </p>
      )}

      {showMoreForDoubled && (
        <button className="show-more-button" onClick={onShowMoreForDoubled}>
          المزيد
        </button>
      )}

      {/* Third Table */}
      <h2 className="mt-4">تفريدة 3 فرد (148-149)</h2>

      {tripledResults.length > 0 ? (
        <table className="results-table">
          <thead>
            <tr>
              <th>#</th>
              {customColumnNames.map((name, index) => (
                <th key={index}>{name}</th>
              ))}
              <th>المجموع</th>
            </tr>
          </thead>
          <tbody>
            {tripledResults.map((result, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {customColumnNames.map((name, colIndex) => (
                  <td key={colIndex}>{result[`input${colIndex + 1}`]}</td>
                ))}
                <td>{result.sum.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="alert alert-danger text-center">لا يوجد تفريده ل 3  فرد من هذة السلع </p>
      )}

      {showMoreForTripled && (
        <button className="show-more-button" onClick={onShowMoreForTripled}>
          المزيد
        </button>
      )}

      {/* Fourth Table */}
      <h2 className="mt-4">تفريدة 4 فرد (198-199)</h2>

      {quadrupledResults.length > 0 ? (
        <table className="results-table">
          <thead>
            <tr>
              <th>#</th>
              {customColumnNames.map((name, index) => (
                <th key={index}>{name}</th>
              ))}
              <th>المجموع</th>
            </tr>
          </thead>
          <tbody>
            {quadrupledResults.map((result, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {customColumnNames.map((name, colIndex) => (
                  <td key={colIndex}>{result[`input${colIndex + 1}`]}</td>
                ))}
                <td>{result.sum.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="alert alert-danger text-center">لا يوجد تفريده ل 4  فرد من هذة السلع </p>
      )}

      {showMoreForQuadrupled && (
        <button className="show-more-button" onClick={onShowMoreForQuadrupled}>
          المزيد
        </button>
      )}

      {/* Fifth Table */}
      <h2 className="mt-4">تفريدة 5 فرد (223-224)</h2>

      {customResults.length > 0 ? (
        <table className="results-table">
          <thead>
            <tr>
              <th>#</th>
              {customColumnNames.map((name, index) => (
                <th key={index}>{name}</th>
              ))}
              <th>المجموع</th>
            </tr>
          </thead>
          <tbody>
            {customResults.map((result, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {customColumnNames.map((name, colIndex) => (
                  <td key={colIndex}>{result[`input${colIndex + 1}`]}</td>
                ))}
                <td>{result.sum.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="alert alert-danger text-center">لا يوجد تفريده ل 5  فرد من هذة السلع </p>
      )}

      {showMoreForCustom && (
        <button className="show-more-button" onClick={onShowMoreForCustom}>
          المزيد
        </button>
      )}

      {/* Sixth Table */}
      <h2 className="mt-4">تفريدة 6 فرد (248-249)</h2>

      {sixthResults.length > 0 ? (
        <table className="results-table">
          <thead>
            <tr>
              <th>#</th>
              {customColumnNames.map((name, index) => (
                <th key={index}>{name}</th>
              ))}
              <th>المجموع</th>
            </tr>
          </thead>
          <tbody>
            {sixthResults.map((result, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {customColumnNames.map((name, colIndex) => (
                  <td key={colIndex}>{result[`input${colIndex + 1}`]}</td>
                ))}
                <td>{result.sum.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="alert alert-danger text-center">لا يوجد تفريده ل 6  فرد من هذة السلع </p>
      )}

      {showMoreForSixth && (
        <button className="show-more-button" onClick={onShowMoreForSixth}>
          المزيد
        </button>
      )}

      {/* Seventh Table */}
      <h2 className="mt-4">تفريدة 7 فرد (273-274)</h2>

      {seventhResults.length > 0 ? (
        <table className="results-table">
          <thead>
            <tr>
              <th>#</th>
              {customColumnNames.map((name, index) => (
                <th key={index}>{name}</th>
              ))}
              <th>المجموع</th>
            </tr>
          </thead>
          <tbody>
            {seventhResults.map((result, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {customColumnNames.map((name, colIndex) => (
                  <td key={colIndex}>{result[`input${colIndex + 1}`]}</td>
                ))}
                <td>{result.sum.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="alert alert-danger text-center">لا يوجد تفريده ل 7  فرد من هذة السلع </p>
      )}

      {showMoreForSeventh && (
        <button className="show-more-button" onClick={onShowMoreForSeventh}>
          المزيد
        </button>
      )}

      {/* Eighth Table */}
      <h2 className="mt-4">تفريدة 8 فرد (298-299)</h2>

      {eighthResults.length > 0 ? (
        <table className="results-table">
          <thead>
            <tr>
              <th>#</th>
              {customColumnNames.map((name, index) => (
                <th key={index}>{name}</th>
              ))}
              <th>المجموع</th>
            </tr>
          </thead>
          <tbody>
            {eighthResults.map((result, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {customColumnNames.map((name, colIndex) => (
                  <td key={colIndex}>{result[`input${colIndex + 1}`]}</td>
                ))}
                <td>{result.sum.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="alert alert-danger text-center">لا يوجد تفريده ل 8  فرد من هذة السلع </p>
      )}

      {showMoreForEighth && (
        <button className="show-more-button" onClick={onShowMoreForEighth}>
          المزيد
        </button>
      )}

      {/* Back Button */}
      <button className="back-button" onClick={onGoBack}>
        عودة
      </button>
    </div>
  );
};

export default Results;
