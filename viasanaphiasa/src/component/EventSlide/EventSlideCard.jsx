import React from 'react';
import PropTypes from 'prop-types';
import './EventSlideCard.css';

const SetPreviewCard = ({ title, link, termsCount, creator, creatorLink, creatorAvatar, role }) => {
    return (
        <div className="SetPreviewCard AssemblyCard AssemblySmallCard AssemblySmallCard-hover" role="link" tabIndex="0">
            <div className="SetPreviewCard-header">
                <span className="SetPreviewCard-title">
                    <a href={link} className="AssemblyLink AssemblyLink--medium AssemblyLink--title" role="link">
                        <span>{title}</span>
                    </a>
                </span>
                <div className="SetPreviewCard-secondaryMetadata">
                    <div className="SetPreviewCard-secondaryMetadataRow">
                        <span className="AssemblyPill AssemblyPill--metadata">
                            <span className="AssemblyPillText">{termsCount} thuật ngữ</span>
                        </span>
                    </div>
                </div>
            </div>
            <div className="SetPreviewCard-footer">
                <div className="SetPreviewCard-creator">
                    <div className="UserLink">
                        <div className="UserLink-avatar">
                            <a href={creatorLink} title={`Thăm hồ sơ của ${creator}`} className="UILink">
                                <img src={creatorAvatar} alt={`Ảnh hồ sơ của ${creator}`} className="AssemblyAvatar" />
                            </a>
                        </div>
                        <div className="UserLink-content">
                            <a href={creatorLink} className="UILink">
                                <span className="UserLink-username">{creator}</span>
                            </a>
                            {role && (
                                <span className="AssemblyPill AssemblyPill--metadata">
                                    <span className="AssemblyPillText">{role}</span>
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

SetPreviewCard.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    termsCount: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
    creatorLink: PropTypes.string.isRequired,
    creatorAvatar: PropTypes.string.isRequired,
    role: PropTypes.string,
};

export default SetPreviewCard;
