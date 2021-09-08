import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import {
  PasswordManagerComponent,
  Logo,
  Row,
  Form,
  FormHeading,
  Input,
  Image,
  BottomComponent,
  RightComponents,
  List,
  ListItem,
  Detail,
  Password,
} from './StyledComponents'

class PasswordManager extends Component {
  state = {
    passwordsList: [],
    website: '',
    username: '',
    password: '',
    search: '',
  }

  updatingValues = event => {
    switch (event.target.id) {
      case 'website':
        this.setState({website: event.target.value})
        break
      case 'username':
        this.setState({username: event.target.value})
        break
      case 'password':
        this.setState({password: event.target.value})
        break
      default:
        break
    }
  }

  searching = event => {
    this.setState({search: event.target.value})
  }

  submitForm = event => {
    event.preventDefault()
    const {passwordsList, website, username, password} = this.state
    if (website !== '' && username !== '' && password !== '') {
      const listItem = {
        id: uuidv4(),
        website,
        username,
        password,
      }
      this.setState({
        passwordsList: [...passwordsList, listItem],
        website: '',
        username: '',
        password: '',
      })
    }
  }

  renderTopSection = () => {
    const {website, username, password} = this.state
    return (
      <Row>
        <Form onSubmit={this.submitForm}>
          <FormHeading>Add New Password</FormHeading>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
            alt="website"
          />
          <Input
            id="website"
            value={website}
            onChange={this.updatingValues}
            placeholder="Enter Website"
            type="text"
          />{' '}
          <br />
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
            alt="username"
          />
          <Input
            id="username"
            value={username}
            onChange={this.updatingValues}
            placeholder="Enter Username"
            type="text"
          />{' '}
          <br />
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
            alt="password"
          />
          <Input
            id="password"
            value={password}
            onChange={this.updatingValues}
            placeholder="Enter Password"
            type="password"
          />{' '}
          <br />
          <button type="submit">Add</button>
        </Form>
        <Image
          src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
          alt="password manager"
        />
      </Row>
    )
  }

  renderNoListView = () => (
    <div>
      <Image
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="be no passwords"
      />
      <h1>No Passwords</h1>
    </div>
  )

  renderPasswordsListView = () => {
    const {passwordsList, isShow, search} = this.state
    if (search !== '') {
      const filteredList = passwordsList.filter(listItem =>
        listItem.website.toLowerCase().includes(search.toLowerCase()),
      )
      if (filteredList.length === 0) {
        return this.renderNoListView()
      }
      return (
        <List>
          {filteredList.map(passwordsListItem => {
            const {id, website, username, password} = passwordsListItem
            return (
              <ListItem key={id}>
                <h1>{website[0]}</h1>
                <div>
                  <Detail>{website}</Detail>
                  <Detail>{username}</Detail>
                  {!isShow ? (
                    <Password
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                      alt="stars"
                    />
                  ) : (
                    <p>{password}</p>
                  )}
                </div>
                <button type="button">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                    alt="delete"
                  />
                </button>
              </ListItem>
            )
          })}
        </List>
      )
    }
    return (
      <List>
        {passwordsList.map(passwordsListItem => {
          const {id, website, username, password} = passwordsListItem
          return (
            <ListItem key={id}>
              <h1>{website[0]}</h1>
              <div>
                <Detail>{website}</Detail>
                <Detail>{username}</Detail>
                {!isShow ? (
                  <Password
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                    alt="stars"
                  />
                ) : (
                  <p>{password}</p>
                )}
              </div>
              <button
                testid="delete"
                type="button"
                onClick={() => {
                  this.setState(prevState => ({
                    passwordsList: prevState.passwordsList.filter(
                      listItem => listItem.id !== id,
                    ),
                  }))
                }}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                  alt="delete"
                />
              </button>
            </ListItem>
          )
        })}
      </List>
    )
  }

  renderBottomSection = () => {
    const {passwordsList, website, username, password, isShow} = this.state
    console.log(passwordsList, website, username, password)
    return (
      <BottomComponent>
        <Row>
          <FormHeading>Your Passwords</FormHeading>
          <Row>
            <FormHeading>{passwordsList.length}</FormHeading>
            <div>
              <button type="button">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/search-img.png"
                  alt="search"
                />
              </button>
              <Input
                onChange={this.searching}
                placeholder="Search"
                type="search"
              />
            </div>
          </Row>
        </Row>
        <hr />
        <RightComponents>
          <input
            id="showPasswords"
            type="checkbox"
            checked={isShow}
            onClick={() => {
              this.setState(prevState => ({isShow: !prevState.isShow}))
            }}
          />
          <label htmlFor="showPasswords">Show Passwords</label>
        </RightComponents>
        {passwordsList.length === 0
          ? this.renderNoListView()
          : this.renderPasswordsListView()}
      </BottomComponent>
    )
  }

  render() {
    return (
      <PasswordManagerComponent>
        <Logo
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        {this.renderTopSection()}
        {this.renderBottomSection()}
      </PasswordManagerComponent>
    )
  }
}

export default PasswordManager
