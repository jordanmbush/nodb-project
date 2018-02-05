import React, {Component} from 'react';

function HelpPage() {

    return (
        <div className="main-content">
            <h1>These are the rules of CODE CLUB</h1>
            <ul>
                <li>1st RULE: You do not talk about CODE CLUB.</li>
                <li>2nd RULE: You DO NOT talk about CODE CLUB.</li>
                <li>3rd RULE: If someone returns 'undefined', causes and infinite loop, or echo's 'Goodbye World', the code battle is over.</li>
                <li>4th RULE: Num of fighters >=2 must be true.</li>
                <li>5th RULE: Num of concurrent battles = 1.</li>
                <li>6th RULE: No mice, no trackpads</li>
                <li>7th RULE: Code will run as long as it has to, expect limit is 3000 ms.</li>
                <li>8th RULE: If this is your first night at CODE CLUB, you HAVE to battle.</li>
            </ul>
        </div>
    )
}

export default HelpPage;