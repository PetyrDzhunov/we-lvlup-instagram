import '../styles/optional-login.css'
import FacebookLogin from './FacebookLogin'

function OptionalLogin(): JSX.Element {
    return (
        <section>
            <div className="optional-login">
                <span className="dash" />
                <div className="optional-login__text">или</div>
                <span className="dash" />
            </div>
            <FacebookLogin />
        </section>
    )
}

export default OptionalLogin
