function QuizCard ({
    question , 
    onSelect,
    selected 
})  {

    const optionLabels = ["a", "b", "c", "d"];

  return (
    
    <div >
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-black">{question.question}</h2>
        <div className="space-y-2">
          {Array.isArray(question.option) && question.option.map((option, index) => (
            <button
              key={index}
              onClick={()=> onSelect(question.id , optionLabels[index])}
              className= {`w-full font-semibold py-2 px-4 rounded
                  ${selected === optionLabels[index] ? "bg-blue-700 text-white" : "bg-blue-400 hover:bg-blue-600 text-white"}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
