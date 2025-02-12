
interface CrimeData {
    division: string;
    theftBurglary: string;
    dacityRobbery: string;
    murder: string;
    womenChildRepression: string;
    drugRelated: string;
    others: string;
  }
  
  interface ThemeTableProps {
    data: CrimeData[];
  }
  
  export const ThemeTable = () => {
    const crimeData: CrimeData[] = [
      { division: "Dhaka", theftBurglary: "30%", dacityRobbery: "20%", murder: "15%", womenChildRepression: "20%", drugRelated: "10%", others: "5%" },
      { division: "Chattogram", theftBurglary: "25%", dacityRobbery: "15%", murder: "20%", womenChildRepression: "25%", drugRelated: "10%", others: "5%" },
      { division: "Rajshahi", theftBurglary: "20%", dacityRobbery: "10%", murder: "25%", womenChildRepression: "30%", drugRelated: "10%", others: "5%" },
      { division: "Khulna", theftBurglary: "25%", dacityRobbery: "15%", murder: "20%", womenChildRepression: "25%", drugRelated: "10%", others: "5%" },
      { division: "Barisal", theftBurglary: "20%", dacityRobbery: "10%", murder: "15%", womenChildRepression: "40%", drugRelated: "10%", others: "5%" },
      { division: "Sylhet", theftBurglary: "25%", dacityRobbery: "15%", murder: "20%", womenChildRepression: "30%", drugRelated: "5%", others: "5%" },
      { division: "Rangpur", theftBurglary: "20%", dacityRobbery: "10%", murder: "25%", womenChildRepression: "30%", drugRelated: "10%", others: "5%" },
      { division: "Mymensingh", theftBurglary: "15%", dacityRobbery: "10%", murder: "20%", womenChildRepression: "40%", drugRelated: "10%", others: "5%" },
    ];
  
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-y-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-3 py-4 text-left text-sm font-medium text-gray-100">Division</th>
                <th className="px-3 py-4 text-left text-sm font-medium text-gray-100 whitespace-nowrap">Theft & Burglary</th>
                <th className="px-3 py-4 text-left text-sm font-medium text-gray-100 whitespace-nowrap">Dacity & Robbery</th>
                <th className="px-3 py-4 text-left text-sm font-medium text-gray-100">Murder</th>
                <th className="px-3 py-4 text-left text-sm font-medium text-gray-100 whitespace-nowrap">Women & Child Repression</th>
                <th className="px-3 py-4 text-left text-sm font-medium text-gray-100 whitespace-nowrap">Drug-Related Offenses</th>
                <th className="px-3 py-4 text-left text-sm font-medium text-gray-100">Others</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {crimeData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-4 text-gray-900">{row.division}</td>
                    <td className="px-3 py-4 text-gray-600 text-center">{row.theftBurglary}</td>
                    <td className="px-3 py-4 text-gray-600 text-center">{row.dacityRobbery}</td>
                    <td className="px-3 py-4 text-gray-600 text-center">{row.murder}</td>
                    <td className="px-3 py-4 text-gray-600 text-center">{row.womenChildRepression}</td>
                    <td className="px-3 py-4 text-gray-600 text-center">{row.drugRelated}</td>
                    <td className="px-3 py-4 text-gray-600 text-center">{row.others}</td>
                    </tr>
                ))}
            </tbody>

          </table>
        </div>
      </div>
    );
  };
  