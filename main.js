document.addEventListener('DOMContentLoaded', function () {
    const checkBtn = document.getElementById('check-btn');
    const platformSelect = document.getElementById('platform');
    const loadingElement = document.getElementById('loading');
    const resultSection = document.getElementById('result-section');
    const resultUsername = document.getElementById('result-username');
    const followerCount = document.getElementById('follower-count');
    const reactionMessage = document.getElementById('reaction-message');
    const celebComparison = document.getElementById('celeb-comparison');

    const reactionMessages = [
        {
            min: 1000000,
            message: "Omo! See as followers full ground! You be celeb o 🤯🔥",
            celeb: "Burna Boy",
            celebComment: "You pass Burna Boy? Abeg share money! 💵😂"
        },
        {
            min: 500000,
            message: "Big boy/girl don enter! Who you know? 😎👑",
            celeb: "Davido",
            celebComment: "You reach Davido level? OBO no go like this! 😂🎵"
        },
        {
            min: 100000,
            message: "You dey try small, but no reach Wizkid level 😏📊",
            celeb: "Mr Macaroni",
            celebComment: "You get small clout, but Macaroni still pass you 😅"
        },
        {
            min: 50000,
            message: "Lecture no dey your followers o! 😂",
            celeb: "Tacha",
            celebComment: "You try, but Tacha still dey flex pass you 😅📉"
        },
        {
            min: 10000,
            message: "Na wa o, your followers dey try, but no be celeb level 📉",
            celeb: "Broda Shaggi",
            celebComment: "Shaggi go still roast you for skit 😭😂"
        },
        {
            min: 1000,
            message: "Oga abeg go boost your account small... this one no reach 😢",
            celeb: "Naira Marley",
            celebComment: "Naira Marley no go follow you, sorry 😂"
        },
        {
            min: 100,
            message: "You sure say you get account? We no see anything 😭🤓",
            celeb: "Zuckerberg",
            celebComment: "Even Mark Zuckerberg no know you exist 😭"
        },
        {
            min: 0,
            message: "Na juju you use? Weytin you do Mark?! 🥴🤥",
            celeb: "Agbero",
            celebComment: "Your followers no reach agbero for motor park 😂🚗"
        }
    ];

    checkBtn.addEventListener('click', function () {
        const platform = platformSelect.value;

        resultSection.style.display = 'none';
        loadingElement.style.display = 'block';

        setTimeout(function () {
            loadingElement.style.display = 'none';

            const randomFollowers = Math.floor(Math.random() * 5000000);

            animateValue(followerCount, 0, randomFollowers, 1500);

            const messageObj = reactionMessages.find(msg => randomFollowers >= msg.min) ||
                reactionMessages[reactionMessages.length - 1];

            resultUsername.textContent = `Your ViralMeter Results`;
            reactionMessage.textContent = messageObj.message;
            celebComparison.innerHTML = `You reach <strong>${messageObj.celeb}</strong> level? ${messageObj.celebComment}`;

            resultSection.style.display = 'block';
        }, 2000);
    });

    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = numberWithCommas(value);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
});

function shareResult(platform) {
    const followers = document.getElementById('follower-count').textContent;
    const reaction = document.getElementById('reaction-message').textContent;
    const celeb = document.getElementById('celeb-comparison').textContent;

    const shareText = `My ViralMeter Results\n\n` +
        `🎉 ${followers} followers!\n\n` +
        `"${reaction}"\n\n` +
        `${celeb}\n\n` +
        `Check yours: viralmeter.ng\n` +
        `#ViralMeterChallenge #WhoGetPassMe 😹`;

    switch (platform) {
        case 'whatsapp':
            window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`);
            break;
        case 'twitter':
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`);
            break;
        case 'facebook':
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`);
            break;
        case 'instagram':
            navigator.clipboard.writeText(shareText);
            alert("📋 Copied to clipboard! Paste in your IG story");
            break;
    }
}
