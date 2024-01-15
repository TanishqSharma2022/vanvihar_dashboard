import React, { useEffect, useState } from 'react'




const GetQuestions = () => {
    const [data, setData] = useState()
    useEffect(() => {
        async function getQuestions() {
            const response = await fetch('https://vanviharquiz-gpaty.ondigitalocean.app/api/v1/quizQuestion/getQuestionReport')
            const data = await response.json()

            setData(data.data)
        }

        getQuestions();
    }, [])





  return (
    <div>
        <pre>
            {JSON.stringify(data, null, 2)}
        </pre>
      
    </div>
  )
}





export default GetQuestions
